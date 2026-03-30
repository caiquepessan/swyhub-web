import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Must be logged in via Discord
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Login required.' }, { status: 401 });
    }

    const PUBLISHER_ID = process.env.LINKVERTISE_PUBLISHER_ID || "1375696";
    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    
    // The target URL where the user will be redirected to AFTER Linkvertise
    const callbackUrl = `${protocol}://${host}/api/keys/verify`;
    const encodedUrl = Buffer.from(callbackUrl).toString('base64');

    // Linkvertise Dynamic Link Formula
    // https://linkvertise.com/[PUB_ID]/[LINK_NAME]/dynamic?r=[BASE64_URL]
    const linkvertiseUrl = `https://link-to.net/${PUBLISHER_ID}/swyhub/dynamic?r=${encodedUrl}`;

    return NextResponse.json({ 
      success: true, 
      url: linkvertiseUrl 
    });

  } catch (err: any) {
    console.error("Link Generation Error:", err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
