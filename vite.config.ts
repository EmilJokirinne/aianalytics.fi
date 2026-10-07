import { copyFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const root = dirname(fileURLToPath(import.meta.url))

// Projekti on litteä (ei public-kansiota), joten staattiset tiedostot kopioidaan buildiin erikseen.
const STATIC_FILES = ['robots.txt', 'sitemap.xml', 'og-image.png', 'favicon.svg', 'apple-touch-icon.png']

function copyStatic(): Plugin {
  let isSsr = false
  return {
    name: 'copy-static-files',
    apply: 'build',
    configResolved(config) {
      isSsr = Boolean(config.build.ssr)
    },
    closeBundle() {
      if (isSsr) return
      for (const f of STATIC_FILES) {
        const src = resolve(root, f)
        if (existsSync(src)) copyFileSync(src, resolve(root, 'dist', f))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyStatic()],
  publicDir: false,
  build: {
    target: 'es2020',
    cssMinify: true,
    assetsInlineLimit: 0,
  },
})
