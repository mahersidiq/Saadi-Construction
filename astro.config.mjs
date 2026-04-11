import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://multifamilyrehabspecialists.com',
  integrations: [
    react(),
    tailwind(),
  ],
  output: 'server',
  adapter: vercel(),
});
