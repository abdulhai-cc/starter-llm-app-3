import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      ignored: [
        "/node_modules/",
        "/ignition/deployments/",
        "/artifacts/",
        "/cache/",
        "/.npm/",
        "/.cache/",
      ],
    },
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ['.preview.metainside.io'],
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
