import * as admin from 'firebase-admin';

export async function initializeApp() {
  if (import.meta.dev && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return admin.initializeApp({
      credential: admin.credential.cert(
        process.env.GOOGLE_APPLICATION_CREDENTIALS,
      ),
    });
  }
  return admin.initializeApp();
}
