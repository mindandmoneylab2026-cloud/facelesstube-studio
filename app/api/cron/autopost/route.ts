
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest){
  // Verify cron secret from Vercel Cron or manual
  const auth = req.headers.get('Authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if(auth !== expected && process.env.NODE_ENV === 'production'){
    // Allow Vercel cron without auth check if needed - check x-vercel-cron header
    if(!req.headers.get('x-vercel-cron')){
      return NextResponse.json({error:'Unauthorized - set CRON_SECRET'}, {status:401})
    }
  }
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

  // Get next queued job ordered by publish_at
  const { data: job, error } = await supabase.from('render_jobs').select('*').eq('status','queued').order('publish_at',{ascending:true}).limit(1).single()
  if(error || !job) return NextResponse.json({message:'No queued jobs', error:error?.message})

  // Here you would upload to YouTube using stored access token
  // For now mark as published and return
  await supabase.from('render_jobs').update({status:'published', updated_at: new Date().toISOString()}).eq('id', job.id)

  return NextResponse.json({published: job.id, title: job.script?.title, publish_at: job.publish_at, message:'Job marked published - wire YouTube upload with access_token in production'})
}

export async function POST(req: NextRequest){ return GET(req) }
