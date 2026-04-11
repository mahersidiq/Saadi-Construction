export const SITE_URL = 'https://multifamilyrehabspecialists.com';
export const SITE_NAME = 'MRS';

export function getPageTitle(topic) {
  if (!topic) return `${SITE_NAME} | Houston, TX`;
  return `${topic} | ${SITE_NAME} | Houston, TX`;
}

export function getCanonicalUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedPath = cleanPath === '/' ? '' : cleanPath.replace(/\/+$/, '');
  return `${SITE_URL}${normalizedPath}`;
}
