interface ImportMetaEnv {
  readonly VITE_SECRET_KEY: string;
  readonly VITE_API_URL: string;
  readonly VITE_CHARACTERS_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
