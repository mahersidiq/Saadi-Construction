export const SITE_URL = 'https://saadiconstructiongroup.com';
export const SITE_NAME = 'Saadi Construction Group';

/**
 * Returns a formatted page title string.
 * @param {string} topic - The page topic or title.
 * @returns {string} Formatted title for <title> tag and meta.
 */
export function getPageTitle(topic) {
  if (!topic) {
    return `${SITE_NAME} | Houston, TX`;
  }
  return `${topic} | ${SITE_NAME} | Houston, TX`;
}

/**
 * Returns the full canonical URL for a given path.
 * @param {string} [path=''] - The page path (e.g. '/services/plumbing').
 * @returns {string} Full canonical URL.
 */
export function getCanonicalUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedPath = cleanPath === '/' ? '' : cleanPath.replace(/\/+$/, '');
  return `${SITE_URL}${normalizedPath}`;
}
