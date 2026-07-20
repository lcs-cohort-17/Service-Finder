/// <reference types="vite/client" />
<<<<<<< HEAD
<<<<<<< HEAD
=======

interface ImportMetaEnv {
  readonly VITE_BACKEND_PORT: string;
=======

// Declare CSS module imports
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// Declare image module imports
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

// Vite environment variables
interface ImportMetaEnv {
  readonly VITE_MAP_CENTER_LAT?: string;
  readonly VITE_MAP_CENTER_LNG?: string;
  readonly VITE_MAP_DEFAULT_ZOOM?: string;
>>>>>>> 493eb1d48a930f755b8b0805aa321d5124b07b52
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
<<<<<<< HEAD
>>>>>>> e73a6bdc776359e77e737f8e394e5d7b468492fe
=======
>>>>>>> 493eb1d48a930f755b8b0805aa321d5124b07b52
