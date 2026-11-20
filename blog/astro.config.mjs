import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

// Blog statique servi sous /blog/ par le même hôte que l'app (sortie dans dist/blog).
export default defineConfig({
  site: 'https://memoflow-client.vercel.app',
  base: '/blog',
  outDir: '../dist/blog',
  trailingSlash: 'always',
  output: 'static',
  vite: {
    // Le blog est lancé avec --root blog : sans ça, Astro cherche ses .env dans blog/
    // et les variables PUBLIC_POSTHOG_* (définies à la racine du dépôt) valent undefined.
    envDir: fileURLToPath(new URL('..', import.meta.url)),
  },
});
