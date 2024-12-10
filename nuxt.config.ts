// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-vuefire'],
  vuefire: {
    auth: true,
    config: JSON.parse(process.env.FIREBASE_CONFIG || '{}'),
    appCheck: {
      isTokenAutoRefreshEnabled: true,
      provider: 'ReCaptchaEnterprise',
      key: process.env.RECAPTCHA_KEY || '',
    },
  },
});
