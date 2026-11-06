import { defineConfig } from 'astro/config';

// Blog statique servi sous /blog/ par le même hôte que l'app (sortie dans dist/blog).
export default defineConfig({
  site: 'https://memoflow.example',
  base: '/blog',
  outDir: '../dist/blog',
  trailingSlash: 'always',
  output: 'static',
});
