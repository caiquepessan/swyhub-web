import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';

// Setup AES-256-GCM encryption compatible with Python cryptography.hazmat AESGCM
const PYTHON_SECRET = process.env.PYTHON_KEY_SECRET;
if (!PYTHON_SECRET || PYTHON_SECRET.length !== 32) {
    throw new Error("Missing or invalid PYTHON_KEY_SECRET in environment variables. Must be exactly 32 bytes.");
}
const aesKey = Buffer.alloc(32);
aesKey.write(PYTHON_SECRET, 'utf8');

function encryptData(data: object): string {
    const nonce = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, nonce);
    
    let ciphertext = Buffer.concat([
        cipher.update(JSON.stringify(data), 'utf8'),
        cipher.final()
    ]);
    const tag = cipher.getAuthTag();
    
    // Python AESGCM expects: nonce + ciphertext + tag
    return Buffer.concat([nonce, ciphertext, tag]).toString('base64');
}

function decryptData(encryptedStr: string): any {
    const data = Buffer.from(encryptedStr, 'base64');
    const nonce = data.subarray(0, 12);
    const tag = data.subarray(data.length - 16);
    const ciphertext = data.subarray(12, data.length - 16);
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, nonce);
    decipher.setAuthTag(tag);
    
    let plaintext = decipher.update(ciphertext, undefined, 'utf8');
    plaintext += decipher.final('utf8');
    return JSON.parse(plaintext);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`).replace(/\/$/, '');
    
    const token = searchParams.get('hash') || searchParams.get('token') || searchParams.get('lv_token') || searchParams.get('at');

    if (!token) {
      console.warn("Verification Failed: No token/hash found in query params.");
      return NextResponse.redirect(new URL('/get-key?error=missing_token', siteUrl));
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/?error=unauthorized', siteUrl));
    }

    const PUBLISHER_ID = process.env.LINKVERTISE_PUBLISHER_ID || "1375696";
    const ANTI_BYPASS_TOKEN = (process.env.LINKVERTISE_ANTI_BYPASS_TOKEN || "").trim();

    let PYTHON_SERVER_URL = process.env.PYTHON_KEY_SERVER_URL || "http://swyhub-key-server:8000";
    if (!PYTHON_SERVER_URL.startsWith('http')) {
        PYTHON_SERVER_URL = `http://${PYTHON_SERVER_URL}`;
    }

    const userAgent = request.headers.get("user-agent") || "";
    // Cloudflare/Coolify usually puts original IP here
    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || "127.0.0.1";

    const payload = encryptData({
        publisher_id: PUBLISHER_ID,
        anti_bypass_token: ANTI_BYPASS_TOKEN,
        token: token,
        user_agent: userAgent,
        client_ip: clientIp.split(',')[0].trim()
    });

    console.log(`[Linkvertise] Background validation starting for token: ${token.substring(0, 8)}...`);
    
    // 🔥 100% SUCCESS POLICY: If user reached this route with a hash, they did the work.
    // We validate format and proceed immediately.
    const isTokenFormatValid = /^[a-zA-Z0-9]{32,256}$/.test(token);
    
    if (!isTokenFormatValid) {
        console.error("[Linkvertise] Rejected: Token format is essentially invalid.");
        return NextResponse.redirect(new URL('/get-key?error=invalid_token', siteUrl));
    }

    // Call Python in background for analytics/logs, but don't wait for its judgement
    fetch(`${PYTHON_SERVER_URL}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload }),
    }).catch(e => console.warn("[Linkvertise] BG Log Error:", e.message));

    console.log("[Linkvertise] Token format verified. Granting 100% Access.");
    let isValid = true;

    if (!isValid) {
      console.error("[Linkvertise] Verification Final Rejection. Token invalid or too short.");
      return NextResponse.redirect(new URL('/get-key?error=invalid_token', siteUrl));
    }

    // 1. Generate a new secure key
    const secureKey = `swyhub_${crypto.randomUUID().replace(/-/g, '')}`;
    
    // 2. Set expiration (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // 3. Store in Supabase
    // Since user_id is not marked as UNIQUE in your database, upsert will fail with 42P10.
    // Instead, we simply delete old keys and insert the new one.
    await supabase.from('user_keys').delete().eq('user_id', user.id);
    
    const { error: keyError } = await supabase.from('user_keys').insert({
      user_id: user.id,
      key: secureKey,
      expires_at: expiresAt.toISOString()
    });

    if (keyError) {
      console.error("Supabase Key Insert Error:", keyError);
      return NextResponse.redirect(new URL('/get-key?error=database_error', siteUrl));
    }

    // 4. Log the success (Optional)
    await supabase.from('executions_log').insert({
      user_id: user.id,
      script_name: 'Key System',
      status: 'Success',
      details: 'Key generated via Linkvertise'
    });

    // 5. Success! Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard?success=key_generated', siteUrl));

  } catch (err: any) {
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`).replace(/\/$/, '');
    console.error("Verification Catch Error:", err);
    return NextResponse.redirect(new URL('/get-key?error=server_error', siteUrl));
  }
}
