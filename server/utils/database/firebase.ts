import { getFirestore } from 'firebase-admin/firestore';

export function db() {
  return getFirestore();
}

export function documentsCollection(name: string) {
  return db().collection(name);
}

export function documentsCollectionGroup(name: string) {
  return db().collectionGroup(name);
}

export function document(name: string) {
  return db().doc(name);
}
