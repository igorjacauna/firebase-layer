import { type AppCheckTokenResult, getToken } from 'firebase/app-check';
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack';
import { getCurrentUser, useAppCheck } from 'vuefire';

type ApiRequestOptions = NitroFetchOptions<NitroFetchRequest> & {
  authenticated?: boolean;
};

const FIREBASE_APP_CHECK_HEADER = 'X-Firebase-AppCheck';

export function getAppCheckToken(
  name?: string,
  forceRefresh?: boolean,
): Promise<AppCheckTokenResult> {
  const appCheck = useAppCheck(name);
  return appCheck
    ? getToken(appCheck, forceRefresh)
    : Promise.resolve({ token: '' });
}

export function getApi() {
  return $fetch.create({
    // eslint-disable-next-line complexity
    async onRequest({ options: requestOptions }) {
      // @ts-expect-error just to override headers
      const headers = (requestOptions.headers ||= {});
      const appCheckToken = await getAppCheckToken();
      if (Array.isArray(headers)) {
        headers.push([FIREBASE_APP_CHECK_HEADER, appCheckToken.token]);
      } else if (headers instanceof Headers) {
        headers.set(FIREBASE_APP_CHECK_HEADER, appCheckToken.token);
      } else {
        // @ts-expect-error just to override headers
        headers[FIREBASE_APP_CHECK_HEADER] = appCheckToken.token;
      }
      const user = await getCurrentUser();
      if (user) {
        const token = await user.getIdToken();
        if (Array.isArray(headers)) {
          headers.push(['Authorization', `Bearer ${token}`]);
        } else if (headers instanceof Headers) {
          headers.set('Authorization', `Bearer ${token}`);
        } else {
          // @ts-expect-error just to override headers
          headers.Authorization = `Bearer ${token}`;
        }
      }
    },
  });
}

export default async function apiFetch(
  request: NitroFetchRequest,
  options?: ApiRequestOptions,
) {
  const api = getApi();
  return api(request, options);
}

export function apiGet(
  request: NitroFetchRequest,
  options?: ApiRequestOptions,
) {
  return apiFetch(request, {
    ...options,
    method: 'GET',
  });
}

export function apiPost(
  request: NitroFetchRequest,
  body?: BodyInit | Record<string, unknown> | null,
  options?: ApiRequestOptions,
) {
  return apiFetch(request, {
    ...options,
    body,
    method: 'POST',
  });
}

export function apiPut(
  request: NitroFetchRequest,
  body?: BodyInit | Record<string, unknown> | null,
  options?: ApiRequestOptions,
) {
  return apiFetch(request, {
    ...options,
    body,
    method: 'PUT',
  });
}

export function apiDelete(
  request: NitroFetchRequest,
  options?: ApiRequestOptions,
) {
  return apiFetch(request, {
    ...options,
    method: 'DELETE',
  });
}
