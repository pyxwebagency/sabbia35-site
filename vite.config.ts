// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// To self-host on a plain Node server (e.g. Hostinger VPS / Node app with Node 22),
// build with the node-server preset. Set BUILD_TARGET=node before running `npm run build`
// to produce a Node bundle in `.output/` (start it with `npm start`).
// Leave it unset to keep the default Cloudflare target used by Lovable's hosting.
const useNodePreset = process.env.BUILD_TARGET === "node";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(useNodePreset
    ? {
        nitro: {
          preset: "node-server",
        },
      }
    : {}),
});
