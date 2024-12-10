export default function useRemoteConfig() {
  return useNuxtApp().$getConfig;
}
