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
});
