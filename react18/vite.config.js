import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Docker のバインドマウントではファイル変更イベントが届かないことがあるためポーリング
    watch: { usePolling: true },
  },
})
