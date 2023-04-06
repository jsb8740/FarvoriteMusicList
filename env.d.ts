/// <reference types="vite/client" />

import "@types/youtube";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    // YT: YT;
  }
}
