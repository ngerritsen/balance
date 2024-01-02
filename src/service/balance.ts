import { type Balance } from "../types";
import app from "../firebase";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

const db = getFirestore(app);

export const subscribe = (userId: string, cb: (balance: Balance) => void) =>
  onSnapshot(doc(db, "balance", userId), (doc) => {
    cb((doc.data() || { items: [] }) as Balance);
  });

export const update = (userId: string, balance: Balance) =>
  setDoc(doc(db, "balance", userId), balance);
