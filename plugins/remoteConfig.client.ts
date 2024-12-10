import {
  getRemoteConfig,
  getValue,
  fetchAndActivate,
} from 'firebase/remote-config';

const ONE_MINUTE = 60_000;

export default defineNuxtPlugin(() => {
  try {
    const remoteConfig = getRemoteConfig();
    if (process.env.NODE_ENV !== 'production') {
      remoteConfig.settings.minimumFetchIntervalMillis = ONE_MINUTE;
    }

    fetchAndActivate(remoteConfig);
    return {
      provide: {
        getConfig: (key: string) => getValue(remoteConfig, key),
      },
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      provide: {
        getConfig(key: string) {
          // eslint-disable-next-line no-console
          console.warn('Remote config not available', key);
        },
      },
    };
  }
});
