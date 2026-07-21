/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_PORT?: string;
  readonly VITE_MAP_CENTER_LAT?: string;
  readonly VITE_MAP_CENTER_LNG?: string;
  readonly VITE_MAP_DEFAULT_ZOOM?: string;
}

interface ImportMeta { readonly env: ImportMetaEnv; }
