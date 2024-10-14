import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import mdx from "@mdx-js/rollup"

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react(), mdx({ providerImportSource: "@mdx-js/react" })],
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        components: path.resolve(__dirname, "./src/components"),
        hooks: path.resolve(__dirname, "./src/hooks"),
        slides: path.resolve(__dirname, "./src/slides"),
        store: path.resolve(__dirname, "./src/store"),
        utils: path.resolve(__dirname, "./src/utils"),
      },
    },
  }
})
