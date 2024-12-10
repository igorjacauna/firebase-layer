export default defineNitroPlugin(() => {
  try {
    initializeApp();
  } catch (e) {
    logger.error('Error on initializing plugin ', e as Error);
  }
});
