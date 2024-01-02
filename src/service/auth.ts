import "../firebase";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const auth = getAuth();
const provider = new GithubAuthProvider();

export const onAuth = (cb: (userId?: string) => void) => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    cb(user?.uid);
  });
};

export const logout = () => signOut(auth);
export const login = () => signInWithPopup(auth, provider);
