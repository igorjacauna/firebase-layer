export default defineSecuredEventHandler(async (event) => {
  const { email } = await readBody<{ email: string }>(event);
  await getOTP(email, event);
  setResponseStatus(event, 201);
  return { message: 'OTP sent' };
});
