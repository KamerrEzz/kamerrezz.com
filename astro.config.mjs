// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kamerrezz.com',
  devToolbar: { enabled: false },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/og-preview') })],

  vite: {
    plugins: [tailwindcss()],
  },
});