export const SITE_URL = 'https://saadiconstructiongroup.com';
export const SITE_NAME = 'Saadi Construction Group';

export function getPageTitle(topic) {
  if (!topic) return `${SITE_NAME} | Houston, TX`;
  return `${topic} | ${SITE_NAME} | Houston, TX`;
}

export function getCanonicalUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedPath = cleanPath === '/' ? '' : cleanPath.replace(/\/+$/, '');
  return `${SITE_URL}${normalizedPath}`;
}
