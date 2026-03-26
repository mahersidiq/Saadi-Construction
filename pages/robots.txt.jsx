export default function RobotsTxt() {
  // This component will not render; getServerSideProps handles the response.
  return null;
}

export async function getServerSideProps({ res }) {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://saadiconstructiongroup.com/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(robotsTxt);
  res.end();

  return { props: {} };
}
