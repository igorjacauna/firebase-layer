import { getAppCheck } from 'firebase-admin/app-check';
import type { H3Event } from 'h3';

const FIREBASE_APP_CHECK_HEADER = 'x-firebase-appcheck';

export function defineSecuredEventHandler<T>(handler: (event: H3Event) => T) {
  return defineEventHandler(async event => {
    const appCheckToken = event.node.req.headers[
      FIREBASE_APP_CHECK_HEADER
    ] as string;
    if (!appCheckToken) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden. App not recognized.',
      });
    }

    try {
      await getAppCheck().verifyToken(appCheckToken);
    } catch (err) {
      logger.warning(err);
      throw err;
    }
    return handler(event);
  });
}
