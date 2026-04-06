import type { TekoAssetsManager } from './types.js'
import type { ViteManifest } from './manifest.js'

interface CreateAssetsManagerOptions {
  mode: 'development' | 'production'
  entry: string
  devServerUrl?: string
  manifest?: ViteManifest
}

export function createAssetsManager(options: CreateAssetsManagerOptions): TekoAssetsManager {
  const {
    mode,
    entry,
    devServerUrl = 'http://localhost:5173',
    manifest,
  } = options

  function normalizeDevUrl(file: string) {
    return `${devServerUrl.replace(/\/$/, '')}/${file.replace(/^\//, '')}`
  }

  function scripts(): string {
    if (mode === 'development') {
      return [
        `<script type="module" src="${normalizeDevUrl('@vite/client')}"></script>`,
        `<script type="module" src="${normalizeDevUrl(entry)}"></script>`,
      ].join('\n')
    }

    if (!manifest) return ''

    const item = manifest[entry]
    if (!item?.file) return ''

    return `<script type="module" src="/build/${item.file}"></script>`
  }

  function styles(): string {
    if (mode === 'development') {
      return ''
    }

    if (!manifest) return ''

    const item = manifest[entry]
    if (!item?.css?.length) return ''

    return item.css
      .map((href) => `<link rel="stylesheet" href="/build/${href}">`)
      .join('\n')
  }

  function preload(): string {
    if (mode === 'development') {
      return ''
    }

    if (!manifest) return ''

    const item = manifest[entry]
    if (!item?.imports?.length) return ''

    return item.imports
      .map((file) => manifest[file]?.file)
      .filter(Boolean)
      .map((href) => `<link rel="modulepreload" href="/build/${href}">`)
      .join('\n')
  }

  return {
    scripts,
    styles,
    preload,
  }
}