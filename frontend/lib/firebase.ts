import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

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