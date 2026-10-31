import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  build: {
    rolldownOptions: {
      output: {
        // Librerías en chunks separados: se cachean entre deploys y se descargan en paralelo
        codeSplitting: {
          groups: [
            { name: 'react', test: /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/ },
            { name: 'motion', test: /[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
            { name: 'icons', test: /[\\/]node_modules[\\/](react-icons|lucide-react)[\\/]/ },
          ],
        },
      },
    },
  },
})
