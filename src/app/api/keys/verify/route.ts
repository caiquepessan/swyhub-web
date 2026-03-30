import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`).replace(/\/$/, '');
    
    // Check for common token parameter names used by Linkvertise/Lootlabs
    // Your logs show "hash=" being sent by Linkvertise
    const token = searchParams.get('hash') || searchParams.get('token') || searchParams.get('lv_token') || searchParams.get('at');

    if (!token) {
      console.warn("Verification Failed: No token/hash found in query params. Params found:", Object.fromEntries(searchParams.entries()));
      return NextResponse.redirect(new URL('/get-key?error=missing_token', siteUrl));
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/?error=unauthorized', siteUrl));
    }

    const PUBLISHER_ID = process.env.LINKVERTISE_PUBLISHER_ID || "1375696";
    const ANTI_BYPASS_TOKEN = (process.env.LINKVERTISE_ANTI_BYPASS_TOKEN || "").trim();

    // Verify token with Linkvertise API
    // Switching to publisher.linkvertise.com which is often more stable for API calls
    const verifyUrl = `https://publisher.linkvertise.com/api/v1/user/${PUBLISHER_ID}/token/${ANTI_BYPASS_TOKEN}/${token}`;
    
    console.log("Calling Linkvertise API (Refined):", verifyUrl);

    const response = await fetch(verifyUrl, { 
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': siteUrl,
        'Referer': 'https://publisher.linkvertise.com/',
        'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
      },
      // Short timeout to avoid hanging the route
      signal: AbortSignal.timeout(5000)
    });

    const contentType = response.headers.get('content-type');
    const responseText = await response.text();

    if (!response.ok || !contentType?.includes('application/json')) {
      console.error(`Linkvertise API Error (Status ${response.status}):`, responseText.substring(0, 1000));
      return NextResponse.redirect(new URL('/get-key?error=server_error', siteUrl));
    }

    const data = JSON.parse(responseText);

    // Check if verification was successful
    // Linkvertise API usually returns { "success": true } or { "status": "success" }
    const isValid = data.success === true || data.status === 'success';

    if (!isValid) {
      console.error("Linkvertise Verification Rejected:", data);
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
      expires_at: expiresAt.toISOString(),
      is_active: true
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
