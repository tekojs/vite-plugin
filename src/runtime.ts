import { readManifest } from './manifest.js'
import { createAssetsManager } from './assets-manager.js'
import type { TekoAssetsManager, TekoVitePluginOptions } from './types.js'

export async function createTekoViteAssets(
  options: TekoVitePluginOptions = {}
): Promise<TekoAssetsManager> {
  const mode = options.mode ?? (process.env.NODE_ENV === 'production' ? 'production' : 'development')
  const entry = options.entry ?? 'src/client/main.ts'

  if (mode === 'development') {
    return createAssetsManager({
      mode,
      entry,
      devServerUrl: options.devServerUrl ?? 'http://localhost:5173',
    })
  }

  const manifest = await readManifest(options.manifestPath ?? 'public/build/.vite/manifest.json')

  return createAssetsManager({
    mode,
    entry,
    manifest,
  })
}