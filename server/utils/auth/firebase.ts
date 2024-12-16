import type { UserRecord } from 'firebase-admin/auth';
import { getAuth } from 'firebase-admin/auth';
import type { AppConfigInput } from 'nuxt/schema';
import type { H3Event } from 'h3';

export async function getOTP(email: string, event: H3Event) {
  const config = useAppConfig(event);
  const user = await getUserByEmail(email);
  return generateOTP(user, config);
}

export async function authOTP(email: string, otp: string, event: H3Event) {
  const config = useAppConfig(event);
  const user = await getAuth().getUserByEmail(email);
  await checkOtp(user, otp, config);

  await getAuth().updateUser(user.uid, {
    emailVerified: true,
  });
  const token = await getAuth().createCustomToken(user.uid);

  return { token };
};

// eslint-disable-next-line complexity
async function checkOtp(user: UserRecord, otp: string, config: AppConfigInput) {
  const doc = await documentsCollection(
    config.firebase?.authCollection || 'auth',
  ).doc(user.uid).get();
  if (!doc.exists) throw createError({
    status: 404,
    statusMessage: 'OTP not found',
  });

  const data = doc.data();

  if (!data) throw createError({
    status: 404,
    statusMessage: 'OTP data not found',
  });

  if (Number(data.otp) !== Number(otp) || new Date(data.ttl).getTime() < Date.now()) {
    throw createError({
      status: 401,
      statusMessage: 'Invalid OTP',
    });
  }
  await doc.ref.delete();
}

async function getUserByEmail(email: string) {
  const user = await getAuth().getUserByEmail(email).catch(() => null);
  if (user) return user;
  return getAuth().createUser({
    email,
    emailVerified: false,
  });
}

// eslint-disable-next-line complexity
async function generateOTP(user: UserRecord, config: AppConfigInput) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  await documentsCollection(config.firebase?.authCollection || 'auth').doc(user.uid).set({
    otp,
    ttl: Date.now() + (config.firebase?.otpTTL || 1000 * 60 * 5),
  });
  return otp;
}