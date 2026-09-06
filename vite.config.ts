import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Bind to all network interfaces (not just localhost) so devices on the
  // same network can reach the dev server via this machine's local IP —
  // needed for cross-device demos/testing (e.g. clicking an emailed
  // verification link from a phone).
  server: {
    host: true,
  },
})
