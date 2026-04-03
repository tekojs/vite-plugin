export interface TekoVitePluginOptions {
  entry?: string;
}

export default function teko(_options: TekoVitePluginOptions = {}) {
  return {
    name: 'teko-vite-plugin',
    enforce: 'pre',
    config() {
      return {
        appType: 'custom'
      };
    }
  };
}
