import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  // React Compiler (v1.0 で安定版) を Babel 経由で有効化
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    host: true,
    port: 5173,
    // Docker のバインドマウントではファイル変更イベントが届かないことがあるためポーリング
    watch: { usePolling: true },
  },
})
