export default defineAppConfig({
  firebase: {
    authCollection: 'auth',
    otpTTL: 1000 * 60 * 5, // 5 minutes
  },
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    firebase?: {
      /** Project name */
      authCollection?: string
      otpTTL?: number
    }
  }
}
