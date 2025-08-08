// https://nuxt.com/docs/api/configuration/nuxt-config

import viteTSConfig from "vite-tsconfig-paths";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  css: ["~/assets/styles/main.css", "~/assets/styles/reset.css"],
  vite: {
    plugins: [viteTSConfig()],
  },
});
