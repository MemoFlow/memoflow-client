import { defineConfig } from 'astro/config';

// Blog statique servi sous /blog/ par le même hôte que l'app (sortie dans dist/blog).
export default defineConfig({
  site: 'https://memoflow-client.vercel.app',
  base: '/blog',
  outDir: '../dist/blog',
  trailingSlash: 'always',
  output: 'static',
});
