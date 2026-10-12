import { copyFileSync, existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vitest/config"

function stickerFiles(): Plugin {
  const directory = resolve("public/assets/bbreak/stickers/chat-512")
  const files = existsSync(directory)
    ? readdirSync(directory).filter((name) => name.toLowerCase().endsWith(".png"))
    : []

  return {
    name: "bbreak-sticker-files",
    config() {
      return {
        define: {
          __BBREAK_STICKERS__: JSON.stringify(files),
        },
      }
    },
  }
}

function githubPagesFallback(): Plugin {
  return {
    name: "github-pages-spa-fallback",
    apply: "build",
    closeBundle() {
      copyFileSync(resolve("dist/index.html"), resolve("dist/404.html"))
    },
  }
}

export default defineConfig({
  plugins: [react(), stickerFiles(), githubPagesFallback()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
})
