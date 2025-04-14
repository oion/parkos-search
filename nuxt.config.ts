// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/test-utils", "@nuxtjs/tailwindcss"],
  tailwindcss: {
    editorSupport: true,
    exposeConfig: true,
    viewer: true,
  },
  css: ["~/assets/css/app.css"],
});
