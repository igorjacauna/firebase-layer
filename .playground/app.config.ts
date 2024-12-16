export default defineAppConfig({
  firebase: {
    authCollection: 'auth-otp',
    otpTTL: 1000 * 60 * 5, // 5 minutes
  },
});
