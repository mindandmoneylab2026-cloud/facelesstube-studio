
# FacelessTube Studio - Complete Production Repo v3.0

Full faceless YouTube automation: analyze -> generate -> voiceover -> render -> auto-post.

## Quick Start (5 min)

1. Unzip
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill keys
4. `npm run dev` -> http://localhost:3000

## Deploy to Vercel (1-click)

1. Push this folder to GitHub: `git init && git add . && git commit -m "launch" && gh repo create facelesstube --public --source=. --push`
2. Go to vercel.com -> Import GitHub repo
3. Add all env vars from .env.example in Vercel dashboard
4. Deploy -> copy your URL
5. Go to console.cloud.google.com -> Credentials -> Add redirect URI: https://YOUR-VERCEL-URL.vercel.app/api/auth/callback/google

## What's Inside

- /app/page.tsx -> Main Studio UI (analysis + generation)
- /app/api/youtube/upload -> Resumable upload + scheduling via publishAt
- /app/api/analyze -> Whisper + GPT-4 topic extraction
- /app/api/render -> ElevenLabs TTS + FFmpeg job queue
- /app/api/pexels/search -> B-roll proxy
- /app/api/cron/autopost -> Daily 6PM auto-publisher (cron)
- /supabase/schema.sql -> render_jobs table
- /public/branding -> Logos + banners (generated)
- /public/videos -> 7 final captioned MP4s (1080x1920)
- /docs/LAUNCH_BIBLE.md -> Complete step-by-step guide

## Channel Assets Included

- Logos: neon_mml_logo.webp, ae_neon_monogram_logo.webp, brain_hacks_logo.webp
- Banners: mind_money_lab_banner.webp, the_ai_edge_banner.webp
- Thumbnails: 9 viral thumbnails
- Videos: 7 captioned shorts ready to upload
- Scripts: 10 viral scripts (AI, Finance, Psychology)

## Cron Job

vercel.json has cron: 0 18 * * * -> /api/cron/autopost
Enable in Vercel dashboard -> Crons.

Test locally:
curl -H "Authorization: Bearer YOUR_CRON_SECRET" http://localhost:3000/api/cron/autopost

## Support

See /docs/LAUNCH_BIBLE.md for detailed step-by-step with screenshots description.
