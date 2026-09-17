
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest){
  const q = req.nextUrl.searchParams.get('q') || 'abstract background'
  if(!process.env.PEXELS_API_KEY) return NextResponse.json({videos:[]})
  const r = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&per_page=8`, {
    headers:{Authorization: process.env.PEXELS_API_KEY!}
  })
  const data = await r.json()
  return NextResponse.json(data)
}
