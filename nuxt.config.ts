// https://nuxt.com/docs/api/configuration/nuxt-config

// import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  css: ["@/assets/styles/main.css", "@/assets/styles/reset.css"],
  vite: {
    resolve: {
      alias: {
        "~": fileURLToPath(new URL(".", import.meta.url)),
        "@": fileURLToPath(new URL(".", import.meta.url)),
      },
    },
  },
});
