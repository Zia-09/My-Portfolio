import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from "kimi-plugin-inspect-react"

const repoBase = "/My-Portfolio/"

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? repoBase : "/",
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
