import type { UseFetchOptions } from 'nuxt/app';

export function useAPI<T>(
  url: string | (() => string),
  options: Omit<UseFetchOptions<T>, 'default'>,
) {
  return useFetch(url, {
    ...options,
    // @ts-expect-error overriding $fetch
    $fetch: useNuxtApp().$api,
  });
}
