// Ajetaan buildin lopuksi: kirjoittaa esirenderöidyn HTML:n ja JSON-LD:n dist/index.html-tiedostoon.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))
const { render, structuredData } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)

const file = resolve(root, 'dist/index.html')
const jsonLd = structuredData()
  .map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)
  .join('\n    ')

const html = readFileSync(file, 'utf8')
  .replace('<!--app-html-->', render())
  .replace('<!--structured-data-->', jsonLd)

writeFileSync(file, html)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Esirenderöity: dist/index.html')
