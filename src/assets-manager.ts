export interface TekoAssetsManager {
  styles(): string;
  scripts(): string;
  preload(): string;
}

export function createAssetsManager(entry = '/src/client/main.ts'): TekoAssetsManager {
  return {
    styles() {
      return '';
    },
    scripts() {
      return `<script type="module" src="${entry}"></script>`;
    },
    preload() {
      return '';
    },
  };
}
