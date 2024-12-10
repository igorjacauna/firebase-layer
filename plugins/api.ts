export default defineNuxtPlugin(() => {
  const api = getApi();

  return {
    provide: {
      api,
    },
  };
});
