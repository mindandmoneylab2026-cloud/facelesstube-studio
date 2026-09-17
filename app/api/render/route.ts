
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
export async function POST(req: NextRequest){
  const { script, voiceId, style, publishAt } = await req.json()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

  // 1. ElevenLabs TTS
  let audioUrl = null
  if(process.env.ELEVENLABS_API_KEY && script){
    try{
      const tts = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId || '21m00Tcm4TlvDq8ikWAM'}`, {
        method:'POST',
        headers:{'xi-api-key':process.env.ELEVENLABS_API_KEY!, 'Content-Type':'application/json'},
        body: JSON.stringify({text:script.substring(0,5000), model_id:'eleven_multilingual_v2', voice_settings:{stability:0.5,similarity_boost:0.75}})
      })
      if(tts.ok){
        // In production, upload to Supabase Storage and get URL
        audioUrl = 'stored-in-supabase-storage'
      }
    }catch(e){ console.error(e) }
  }

  // 2. Queue to Supabase for FFmpeg worker (Cloud Run / Vercel Function)
  const { data, error } = await supabase.from('render_jobs').insert({
    status:'queued',
    script: typeof script === 'string' ? {title: script.substring(0,60), description: script} : script,
    publish_at: publishAt || new Date().toISOString(),
    output_type: 'short'
  }).select().single()

  if(error) return NextResponse.json({error:error.message},{status:400})
  return NextResponse.json({ status:'queued', jobId: data.id, audioUrl, message:'Render queued - FFmpeg will crop to 9:16, burn captions, add B-roll' })
}
