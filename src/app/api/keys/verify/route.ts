import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';

// Setup AES-256-GCM encryption compatible with Python cryptography.hazmat AESGCM
const PYTHON_SECRET = process.env.PYTHON_KEY_SECRET || "swyhub_secret_key_32_bytes_long!";
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

    const PYTHON_SERVER_URL = process.env.PYTHON_KEY_SERVER_URL || "http://swyhub-key-server:8000";

    const payload = encryptData({
        publisher_id: PUBLISHER_ID,
        anti_bypass_token: ANTI_BYPASS_TOKEN,
        token: token
    });

    console.log("Routing encrypted verification through Python Microservice...");
    let isValid = false;

    try {
        const response = await fetch(`${PYTHON_SERVER_URL}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payload }),
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) {
            throw new Error(`Python Server returned Status ${response.status}`);
        }
        
        const resData = await response.json();
        const pythonResult = decryptData(resData.payload);
        
        isValid = pythonResult.success === true;
        
        if (!isValid) {
            console.error("Linkvertise Verification Rejected by Python:", pythonResult);
        }
    } catch (e: any) {
        console.warn("Python Verification Failed or Container Down. Falling back to format validation. Error:", e.message);
        isValid = /^[a-zA-Z0-9]{32,128}$/.test(token);
    }

    if (!isValid) {
      console.error("Linkvertise Verification Rejected. Token format or API response invalid.");
      return NextResponse.redirect(new URL('/get-key?error=invalid_token', siteUrl));
    }

    // 1. Generate a new secure key
    const secureKey = `swyhub_${crypto.randomUUID().replace(/-/g, '')}`;
    
    // 2. Set expiration (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // 3. Store in Supabase
    const { error: keyError } = await supabase.from('user_keys').upsert({
      user_id: user.id,
      key_content: secureKey,
      expires_at: expiresAt.toISOString()
    }, { onConflict: 'user_id' });

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
