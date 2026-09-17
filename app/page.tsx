
'use client'
import { useState } from 'react'
export default function Page(){
  const [tab,setTab]=useState('studio')
  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:24}}>
      <h1 style={{fontSize:32,fontWeight:800}}>FacelessTube Studio v3 - Complete</h1>
      <p style={{opacity:0.7}}>Full factory: Analyze → Scripts → Voice → Render → Auto-Post. Repo includes 7 videos, 5 logos/banners, 9 thumbnails, 10 scripts.</p>
      <div style={{display:'flex',gap:8,marginTop:16}}>
        {['studio','branding','videos','guide'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 16px',borderRadius:8,border:0,background:tab===t?'#FF0000':'#1a1a1d',color:'white',cursor:'pointer',textTransform:'capitalize'}}>{t}</button>
        ))}
      </div>
      <div style={{marginTop:24,padding:24,background:'#111',borderRadius:12}}>
        {tab==='studio' && <div>
          <h2>Studio Ready</h2>
          <p>API Routes:</p>
          <ul><li>/api/youtube/upload - resumable + publishAt scheduling</li><li>/api/analyze - Whisper + GPT-4</li><li>/api/render - ElevenLabs + FFmpeg queue</li><li>/api/cron/autopost - daily 6PM auto publisher</li></ul>
          <p>Open docs/LAUNCH_BIBLE.md for full guide.</p>
        </div>}
        {tab==='branding' && <div><h2>Branding Assets</h2><p>Check /public/branding/ - 3 logos + 2 banners ready to upload to YouTube Studio → Customization → Branding</p></div>}
        {tab==='videos' && <div><h2>Videos</h2><p>Check /public/videos/ - 7 captioned 1080x1920 shorts ready. Final MP4s with burned captions.</p></div>}
        {tab==='guide' && <div><h2>Launch Bible</h2><p>See /docs/LAUNCH_BIBLE.md and complete-detailed-launch-bible artifact for every click.</p></div>}
      </div>
    </div>
  )
}
