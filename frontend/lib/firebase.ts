import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addTrade = async (trade) => {
  await addDoc(collection(db, 'trades'), {
    ...trade,
    profitLoss: trade.exitPrice ? (trade.exitPrice - trade.entryPrice) : null,
    createdAt: new Date(),
  });
};

export const getTrades = async (filters) => {
  let q = query(collection(db, 'trades'));
  if (filters.symbol) q = query(q, where('symbol', '==', filters.symbol));
  if (filters.emotion) q = query(q, where('emotion', '==', filters.emotion));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTrade = async (id, data) => {
  await updateDoc(doc(db, 'trades', id), data);
};
