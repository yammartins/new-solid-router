import * as path from "node:path"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import { type UserConfig, defineConfig } from "vite"
import solid from "vite-plugin-solid"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ target: "solid", autoCodeSplitting: true }), solid()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
}) satisfies UserConfig
