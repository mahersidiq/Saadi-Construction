-- ============================================
-- Saadi Construction Group — Supabase Schema
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- 1. LEADS TABLE
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text,
  company text,
  email text NOT NULL,
  phone text,
  property_address text,
  city text,
  num_units integer,
  project_type text,
  timeline text,
  source text,
  message text,
  status text DEFAULT 'new'
);

-- 2. PROJECTS TABLE
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  location text,
  city text,
  unit_count integer,
  scope_type text,
  description text,
  body text,
  image_url text,
  gallery_urls text[],
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0
);

-- 3. BLOG POSTS TABLE
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  body text,
  cover_image_url text,
  category text,
  status text DEFAULT 'draft',
  published_at timestamptz,
  author text DEFAULT 'Saadi Construction Group',
  meta_title text,
  meta_description text
);

-- 4. SITE SETTINGS TABLE
CREATE TABLE site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  contact_email text,
  phone text,
  tagline text,
  updated_at timestamptz DEFAULT now()
);

-- Insert default settings
INSERT INTO site_settings (id, contact_email, phone, tagline)
VALUES (
  1,
  'Maher@saadi-construction.com',
  '(512) 962-9856',
  'Houston''s Apartment Renovation Specialists'
);

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- LEADS: anon can INSERT only, authenticated can do ALL
CREATE POLICY "leads_anon_insert" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "leads_auth_all" ON leads
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- PROJECTS: anon can SELECT only, authenticated can do ALL
CREATE POLICY "projects_anon_select" ON projects
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "projects_auth_all" ON projects
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- BLOG POSTS: anon can SELECT published only, authenticated can do ALL
CREATE POLICY "blog_anon_select_published" ON blog_posts
  FOR SELECT TO anon
  USING (status = 'published');

CREATE POLICY "blog_auth_all" ON blog_posts
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- SITE SETTINGS: anon can SELECT only, authenticated can do ALL
CREATE POLICY "settings_anon_select" ON site_settings
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "settings_auth_all" ON site_settings
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 6. STORAGE BUCKET
-- ============================================

-- Create public media bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true);

-- Allow public reads on media bucket
CREATE POLICY "media_public_read" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'media');

-- Allow authenticated users to upload/update/delete
CREATE POLICY "media_auth_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "media_auth_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'media');

CREATE POLICY "media_auth_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media');

-- ============================================
-- 7. SEED BLOG POSTS (drafts)
-- ============================================

INSERT INTO blog_posts (title, slug, excerpt, category, status, author, meta_title, meta_description) VALUES
(
  'How Much Does an Apartment Gut Rehab Cost in Houston?',
  'apartment-gut-rehab-cost-houston',
  'A detailed breakdown of gut rehab costs for apartment communities in Houston, including per-unit pricing, scope variables, and how to budget for a full renovation program.',
  'Cost Guides',
  'draft',
  'Saadi Construction Group',
  'Apartment Gut Rehab Cost Houston TX | Saadi Construction Group',
  'Learn how much a full gut rehab costs for apartments in Houston. Per-unit pricing, scope breakdowns, and budgeting tips from an experienced multifamily renovation contractor.'
),
(
  'Value-Add Apartment Renovation: What Houston Owners Need to Know',
  'value-add-apartment-renovation-houston',
  'How value-add renovation programs work for Class B and C apartment communities in Houston — scope planning, ROI expectations, and execution strategies.',
  'Industry Insights',
  'draft',
  'Saadi Construction Group',
  'Value-Add Apartment Renovation Houston | Saadi Construction Group',
  'Everything Houston apartment owners need to know about value-add renovation programs. Scope planning, ROI expectations, and execution strategies for Class B/C assets.'
),
(
  'Full Gut Rehab vs Unit Renovation: Which Is Right for Your Property?',
  'gut-rehab-vs-unit-renovation',
  'Comparing full gut rehab and unit renovation approaches for apartment communities — when each makes sense, cost differences, and how to decide.',
  'Renovation Tips',
  'draft',
  'Saadi Construction Group',
  'Gut Rehab vs Unit Renovation | Saadi Construction Group | Houston TX',
  'Full gut rehab or unit renovation? Compare approaches, costs, and timelines to determine the right renovation strategy for your Houston apartment community.'
),
(
  'Occupied vs Vacant Apartment Renovation: Pros and Cons',
  'occupied-vs-vacant-apartment-renovation',
  'The trade-offs between renovating occupied and vacant apartment units — impact on revenue, tenant management, timelines, and total project cost.',
  'Renovation Tips',
  'draft',
  'Saadi Construction Group',
  'Occupied vs Vacant Apartment Renovation | Saadi Construction Group',
  'Pros and cons of occupied vs vacant apartment renovation. Learn how each approach impacts revenue, timelines, and costs for Houston multifamily properties.'
),
(
  'How to Choose a Multifamily Renovation Contractor in Houston',
  'choose-multifamily-renovation-contractor-houston',
  'What to look for when hiring a renovation contractor for your apartment community — experience, references, pricing structure, and red flags to avoid.',
  'Industry Insights',
  'draft',
  'Saadi Construction Group',
  'How to Choose a Multifamily Renovation Contractor Houston | Saadi Construction Group',
  'Key factors for choosing the right multifamily renovation contractor in Houston. Experience benchmarks, pricing structures, and red flags to watch for.'
),
(
  'Apartment Renovation Costs in Sugar Land, Katy, and The Woodlands',
  'apartment-renovation-costs-sugar-land-katy-woodlands',
  'A market-specific look at apartment renovation costs in Sugar Land, Katy, and The Woodlands — how suburban Houston pricing compares and what drives cost differences.',
  'Cost Guides',
  'draft',
  'Saadi Construction Group',
  'Apartment Renovation Costs Sugar Land Katy Woodlands | Saadi Construction Group',
  'Compare apartment renovation costs across Sugar Land, Katy, and The Woodlands. Market-specific pricing insights for suburban Houston multifamily properties.'
),
(
  'What Is a Value-Add Apartment and How Does Renovation Increase ROI?',
  'value-add-apartment-renovation-roi',
  'Understanding value-add apartment investing and how strategic renovation programs drive rent premiums, occupancy, and overall asset value for Houston properties.',
  'Market News',
  'draft',
  'Saadi Construction Group',
  'Value-Add Apartment Renovation ROI Houston | Saadi Construction Group',
  'How value-add apartment renovation increases ROI for Houston property owners. Rent premiums, occupancy impact, and renovation strategies that drive asset value.'
);

-- ============================================
-- Done! Your database is ready.
-- ============================================
