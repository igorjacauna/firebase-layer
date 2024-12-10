import {
  type DecodedIdToken,
  type UserRecord,
  getAuth,
} from 'firebase-admin/auth';
import type { H3Event } from 'h3';

type PrivateContext = {
  claims: DecodedIdToken;
  user: UserRecord;
};

export function defineAuthenticatedEventHandler<T>(
  handler: (event: H3Event, privateContext: PrivateContext) => T,
) {
  // AppCheck layer
  return defineSecuredEventHandler(async event => {
    const { authorization } = event.node.req.headers;
    if (!authorization) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden. App not authenticated.',
      });
    }

    const [, token] = authorization.split(' ');
    try {
      const claims = await getAuth().verifyIdToken(token);
      const user = await getAuth().getUser(claims.uid);
      return handler(event, {
        claims,
        user,
      });
    } catch (e) {
      logger.warning(e);
      throw e;
    }
  });
}

export function defineClaimedEventHandler<T>(
  handler: (e: H3Event) => T,
  claims: string[],
) {
  return defineAuthenticatedEventHandler((event, context) => {
    if (!claims.every(c => context.claims[c])) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden. You does not have enough permissions.',
      });
    }
    return handler(event);
  });
}
