import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import mdx from '@astrojs/mdx';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://klimaflow.cz',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    mdx(),
    keystatic(),
  ],
  // The segment pages moved from /x.html to /x/ so they resolve at the URL their
  // canonical tag and the sitemap already advertised. Keep the old paths alive.
  redirects: {
    '/svj.html': { status: 301, destination: '/svj' },
    '/bytova-druzstva.html': { status: 301, destination: '/bytova-druzstva' },
    '/developeri.html': { status: 301, destination: '/developeri' },
    '/kancelare.html': { status: 301, destination: '/kancelare' },
  },
});
