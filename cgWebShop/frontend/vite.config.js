import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd())

  return {plugins: [react()],
    server:{
      proxy:{
        "/api": {
          target: env.VITE_PROXY ? env.VITE_PROXY : 'http://localhost:5287',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
