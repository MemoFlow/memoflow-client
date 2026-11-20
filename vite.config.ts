import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // PUBLIC_ : variables shared with the blog (Astro), e.g. PUBLIC_POSTHOG_PROJECT_TOKEN
  envPrefix: ['VITE_', 'PUBLIC_'],
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://memoflow-dev-api.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,
      },
    },
  },
})
