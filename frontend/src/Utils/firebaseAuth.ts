import { useState } from 'react';
import {
  reauthenticateWithPopup,
  signInWithPopup,
  GoogleAuthProvider,
  deleteUser,
  signOut,
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';

export function useSign() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isSignedOut] = useState<boolean>(true);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsSignedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await reauthenticateWithPopup(auth.currentUser, new GoogleAuthProvider());
      await deleteUser(auth.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    auth,
    isSignedIn,
    isSignedOut,
    handleSignIn,
    handleSignOut,
    handleDeleteUser,
  };
}
