
import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest){
  const body = await req.json()
  const { access_token, title, description, tags, publishAt, videoUrl } = body
  if(!access_token) return NextResponse.json({error:'Missing access_token'}, {status:400})
  // Step 1: Initiate resumable session
  const init = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
      'X-Upload-Content-Type': 'video/mp4'
    },
    body: JSON.stringify({
      snippet: { title: title || 'Faceless Short', description: description || '', tags: tags || ['faceless','ai'], categoryId: '22' },
      status: { privacyStatus: publishAt ? 'private' : 'public', publishAt, selfDeclaredMadeForKids: false }
    })
  })
  if(!init.ok){
    const err = await init.text()
    return NextResponse.json({error:err}, {status:400})
  }
  const uploadUrl = init.headers.get('Location')
  // In production, stream video bytes from videoUrl or blob to uploadUrl
  // For now return uploadUrl so frontend can upload
  return NextResponse.json({ uploadUrl, publishAt, message: 'Upload session created. POST video bytes to uploadUrl' })
}
