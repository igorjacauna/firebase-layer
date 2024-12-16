export default defineSecuredEventHandler(async (event) => {
  const { email, otp } = await readBody<{ email: string; otp: string }>(event);
  return authOTP(email, otp, event);
});