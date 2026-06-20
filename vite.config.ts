import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// Standard client-only SPA configuration (no SSR / Nitro / TanStack Start).
// `vite build` produces a static dist/ folder with a single index.html.
export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: true,
    port: 8080,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 8080,
    strictPort: true,
    allowedHosts: true,
  },
});
