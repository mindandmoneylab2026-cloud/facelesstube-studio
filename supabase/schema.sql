
-- FacelessTube Studio Schema
create table if not exists render_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  status text default 'queued', -- queued, rendering, done, published, failed
  source_url text,
  output_type text default 'short', -- short, long
  script jsonb, -- {title, description, tags, transcript, visualCues}
  youtube_video_id text,
  thumbnail_url text,
  video_url text,
  publish_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists channel_settings (
  id uuid primary key default gen_random_uuid(),
  user_id text unique,
  channel_name text,
  channel_handle text,
  logo_url text,
  banner_url text,
  google_access_token text,
  google_refresh_token text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table render_jobs enable row level security;
alter table channel_settings enable row level security;

-- Policies (allow all for now, lock down later)
create policy "Allow all" on render_jobs for all using (true) with check (true);
create policy "Allow all" on channel_settings for all using (true) with check (true);
