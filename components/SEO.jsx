import Head from 'next/head';

const DEFAULT_OG_IMAGE = '/og-image.jpg';
const SITE_NAME = 'Saadi Construction Group';

/**
 * Reusable SEO component for meta tags and Open Graph data.
 *
 * @param {object}  props
 * @param {string}  props.title         - Page title
 * @param {string}  props.description   - Meta description
 * @param {string}  [props.keywords]    - Comma-separated keywords
 * @param {string}  [props.ogImage]     - Open Graph image URL
 * @param {string}  [props.canonicalUrl] - Canonical URL for the page
 * @param {boolean} [props.noindex]     - If true, tells search engines not to index
 */
export default function SEO({
  title,
  description,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  canonicalUrl,
  noindex = false,
}) {
  const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Head>
      {/* Primary */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
