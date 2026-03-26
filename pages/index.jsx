import Head from 'next/head';
import SEO from '@/components/SEO';
import Hero from '@/components/sections/home/Hero';
import StatsBar from '@/components/sections/home/StatsBar';
import ServicesGrid from '@/components/sections/home/ServicesGrid';
import WhySaadi from '@/components/sections/home/WhySaadi';
import ServiceAreas from '@/components/sections/home/ServiceAreas';
import Process from '@/components/sections/home/Process';
import FeaturedProjects from '@/components/sections/home/FeaturedProjects';
import CTABanner from '@/components/sections/home/CTABanner';

export default function HomePage({ featuredProjects }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor'],
    name: 'Saadi Construction Group',
    description:
      'Houston-based multifamily apartment renovation contractor specializing in full gut rehabs, unit remodels, and property-wide renovation programs.',
    url: 'https://saadiconstructiongroup.com',
    telephone: '(512) 962-9856',
    email: 'Maher@saadi-construction.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '801 Travis St Suite 2101',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77002',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 29.7604,
      longitude: -95.3698,
    },
    areaServed: [
      'Houston', 'Katy', 'Sugar Land', 'Pearland', 'Pasadena',
      'The Woodlands', 'Spring', 'Cypress', 'League City', 'Missouri City',
      'Conroe', 'Baytown', 'Richmond', 'Friendswood', 'Humble',
    ],
    image: 'https://saadiconstructiongroup.com/og-image.jpg',
    priceRange: '$$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  };

  return (
    <>
      <SEO
        title="Apartment Renovation Contractor Houston TX | Saadi Construction Group"
        description="Houston's trusted multifamily apartment renovation contractor. Full gut rehabs, unit remodels, and property-wide renovation programs for apartment owners and operators."
        keywords="apartment renovation Houston, multifamily renovation contractor, apartment rehab Houston TX, unit remodel Houston"
        canonicalUrl="https://saadiconstructiongroup.com"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Hero />
      <StatsBar />
      <ServicesGrid />
      <WhySaadi />
      <ServiceAreas />
      <Process />
      <FeaturedProjects projects={featuredProjects} />
      <CTABanner />
    </>
  );
}

export async function getStaticProps() {
  let featuredProjects = [];

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const { data } = await supabase
        .from('projects')
        .select('slug, title, location, unit_count, scope_type, image_url')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (data) featuredProjects = data;
    }
  } catch (err) {
    console.error('Error fetching featured projects:', err.message);
  }

  return {
    props: { featuredProjects },
    revalidate: 60,
  };
}
