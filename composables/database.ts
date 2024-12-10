import {
  collection,
  doc,
  query,
  type QueryConstraint,
} from 'firebase/firestore';
import { useFirestore, useCollection, useDocument } from 'vuefire';

export function useDatabase() {
  return useFirestore();
}

export function useDocsCollection(collectionRefString: string) {
  const db = useDatabase();
  return useCollection(collection(db, collectionRefString));
}

export function useDoc(docRefString: string) {
  const db = useDatabase();
  return useDocument(doc(db, docRefString));
}

export function useCollectionQuery(
  collectionRefString: string,
  ...args: QueryConstraint[]
) {
  const db = useDatabase();
  const ref = collection(db, collectionRefString);
  return query(ref, ...args);
}
