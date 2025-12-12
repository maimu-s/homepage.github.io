import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'src',
  envDir: '..',  // プロジェクトルートの.envを読み込む
  base: '/homepage/',  // GitHub Pagesのリポジトリ名
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        toplevel: true,
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      },
      output: {
        manualChunks: undefined,
      },
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Twitch RSSのCORSエラーを回避
      '/api/twitch-rss': {
        target: 'https://twitchrss.appspot.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/twitch-rss/, '')
      }
    }
  },
  preview: {
    port: 4173,
    open: true
  }
})
