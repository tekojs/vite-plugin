export interface TekoVitePluginOptions {
  entry?: string
  manifestPath?: string
  devServerUrl?: string
  mode?: 'development' | 'production'
}

export interface TekoAssetsManager {
  scripts(): string
  styles(): string
  preload(): string
}