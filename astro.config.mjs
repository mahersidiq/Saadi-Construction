import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://saadiconstructiongroup.com',
  integrations: [
    react(),
    tailwind(),
  ],
  output: 'server',
  adapter: vercel(),
});
