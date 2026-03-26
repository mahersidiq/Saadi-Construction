import Head from 'next/head';
import SEO from '@/components/SEO';
import AreaHero from '@/components/sections/service-areas/AreaHero';
import AreaServices from '@/components/sections/service-areas/AreaServices';
import NearbyAreas from '@/components/sections/service-areas/NearbyAreas';
import CTABanner from '@/components/sections/home/CTABanner';
import { serviceAreas } from '@/data/serviceAreas';

export default function ServiceAreaPage({ area, nearbyAreas }) {
  if (!area) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Saadi Construction Group',
    description:
      area.metaDescription ||
      `Apartment renovation services in ${area.name}, TX.`,
    url: `https://saadiconstructiongroup.com/service-areas/${area.slug}`,
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
    areaServed: {
      '@type': 'City',
      name: area.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Texas',
      },
    },
  };

  return (
    <>
      <SEO
        title={
          area.metaTitle ||
          `Apartment Renovation in ${area.name}, TX | Saadi Construction Group`
        }
        description={
          area.metaDescription ||
          `Professional apartment renovation services in ${area.name}, Texas. Unit rehabs, kitchen and bathroom remodels, and property-wide renovations.`
        }
        keywords={`apartment renovation ${area.name}, multifamily renovation ${area.name} TX, apartment rehab ${area.name}`}
        canonicalUrl={`https://saadiconstructiongroup.com/service-areas/${area.slug}`}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <AreaHero
        name={area.name}
        county={area.county}
        headline={`Apartment Renovation in ${area.name}`}
      />
      <AreaServices name={area.name} />
      <NearbyAreas nearbyAreas={nearbyAreas} />
      <CTABanner />
    </>
  );
}

export async function getStaticPaths() {
  const paths = serviceAreas.map((area) => ({
    params: { slug: area.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const area = serviceAreas.find((a) => a.slug === params.slug);

  if (!area) {
    return { notFound: true };
  }

  // Resolve nearbyAreas slugs to full area objects
  let nearbyAreas = [];
  if (area.nearbyAreas && area.nearbyAreas.length > 0) {
    nearbyAreas = area.nearbyAreas
      .map((slug) => serviceAreas.find((a) => a.slug === slug))
      .filter(Boolean);
  } else {
    // Fallback: pick first 5 areas excluding current
    nearbyAreas = serviceAreas
      .filter((a) => a.slug !== params.slug)
      .slice(0, 5);
  }

  return {
    props: {
      area,
      nearbyAreas,
    },
  };
}
