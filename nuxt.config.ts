// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-mongoose", "@pinia/nuxt", "@nuxt/ui"],
  css: ["@/assets/css/main.css"],
});
