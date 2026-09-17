
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest){
  const code = req.nextUrl.searchParams.get('code')
  if(!code) return NextResponse.json({error:'No code'}, {status:400})
  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`,
      grant_type:'authorization_code'
    })
  })
  const tokens = await tokenRes.json()
  // TODO: Store tokens in Supabase channel_settings with refresh_token
  return NextResponse.redirect(`${process.env.NEXTAUTH_URL || '/'}/?connected=true&access_token=${tokens.access_token}`)
}
