import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, UserCredential } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const login = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();

  return await signInWithPopup(auth, provider);
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const getUserTokenId = async (): Promise<string | undefined> => {
  return await auth.currentUser?.getIdToken(false);
};
