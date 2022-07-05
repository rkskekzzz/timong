import { useState } from 'react';
import {
  signInWithRedirect,
  GoogleAuthProvider,
  // getRedirectResult,
  signOut,
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';

export function useSign() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
      setIsSignedIn(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    auth,
    isSignedIn,
    handleSignIn,
    handleSignOut,
  };
}
