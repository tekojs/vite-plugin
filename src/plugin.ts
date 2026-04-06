import type { Plugin } from 'vite'
import type { TekoVitePluginOptions } from './types.js'

export default function teko(options: TekoVitePluginOptions = {}): Plugin {
  return {
    name: 'teko-vite-plugin',
    enforce: 'pre',
    config() {
      return {
        appType: 'custom',
        build: {
          manifest: true,
        },
      }
    },
    configResolved(config) {
      if (options.mode && options.mode !== config.mode) {
        // noop por enquanto
      }
    },
  }
}