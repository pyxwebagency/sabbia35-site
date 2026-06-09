// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// To self-host on a plain Node server (e.g. Hostinger VPS / Node app with Node 22),
// force Nitro's node-server preset whenever the build runs outside Lovable.
// Inside Lovable, leave Nitro unconfigured so Publish keeps the platform default.
const isLovableContext = Boolean(process.env.LOVABLE_SANDBOX || process.env.DEV_SERVER__PROJECT_PATH);
const shouldUseNodePreset = process.env.BUILD_TARGET === "node" || !isLovableContext;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(shouldUseNodePreset
    ? {
        nitro: {
          preset: "node-server",
        },
      }
    : {}),
});
