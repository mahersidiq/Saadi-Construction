import { serviceCategories } from '@/data/services';
import { serviceAreas } from '@/data/serviceAreas';

const SITE_URL = 'https://saadiconstructiongroup.com';

function generateSitemap({ projects, blogPosts }) {
  const today = new Date().toISOString().split('T')[0];

  const allServices = serviceCategories.flatMap((cat) => cat.services);

  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/services', priority: '0.7', changefreq: 'monthly' },
    { loc: '/service-areas', priority: '0.7', changefreq: 'monthly' },
    { loc: '/projects', priority: '0.7', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.7', changefreq: 'weekly' },
    { loc: '/about', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
  ];

  const servicePages = allServices.map((s) => ({
    loc: `/services/${s.slug}`,
    priority: '0.9',
    changefreq: 'monthly',
  }));

  const areaPages = serviceAreas.map((a) => ({
    loc: `/service-areas/${a.slug}`,
    priority: '0.9',
    changefreq: 'monthly',
  }));

  const projectPages = (projects || []).map((p) => ({
    loc: `/projects/${p.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const blogPages = (blogPosts || []).map((p) => ({
    loc: `/blog/${p.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const allPages = [
    ...staticPages,
    ...servicePages,
    ...areaPages,
    ...projectPages,
    ...blogPages,
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

export default function SitemapXml() {
  // This component will not render; getServerSideProps handles the response.
  return null;
}

export async function getServerSideProps({ res }) {
  let projects = [];
  let blogPosts = [];

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const [projectsRes, postsRes] = await Promise.all([
        supabase.from('projects').select('slug'),
        supabase
          .from('blog_posts')
          .select('slug')
          .eq('status', 'published'),
      ]);

      if (projectsRes.data) projects = projectsRes.data;
      if (postsRes.data) blogPosts = postsRes.data;
    }
  } catch (err) {
    console.error('Sitemap generation error:', err.message);
  }

  const sitemap = generateSitemap({ projects, blogPosts });

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return { props: {} };
}
