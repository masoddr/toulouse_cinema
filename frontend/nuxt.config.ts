// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Mode statique
  ssr: true,

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  // Modules utiles
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  // Configuration des répertoires publics
  dir: {
    public: 'public'
  },

  // Configuration de Leaflet
  plugins: [
    '~/plugins/leaflet.client.ts'
  ],

  build: {
    transpile: ['@vue-leaflet/vue-leaflet']
  },

  compatibilityDate: '2025-03-20'
})