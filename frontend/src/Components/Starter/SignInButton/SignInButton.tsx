import React, { useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { auth } from 'src/firebase';
import Styled from './SignInButton.styled';
import { ReactComponent as GoogleButtonLogo } from 'src/assets/btn_google_light_normal_ios.svg';

const provider = new GoogleAuthProvider();

const SignInButton = () => {
  const asdf = () => {
    signInWithRedirect(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // ...
        console.log(result);
      })
      .catch((error) => {
        console.log(error);

        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const zxcv = () => {
    signOut(auth);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      // This gives you a Google Access Token. You can use it to access Google APIs.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // // The signed-in user info.
      // const user = result.user;
      // console.log(result);
    });
  }, []);
  return (
    <>
      <Styled.GoogleButton onClick={asdf}>
        <GoogleButtonLogo>hi</GoogleButtonLogo>
        <p>Sign in with Google</p>
      </Styled.GoogleButton>
    </>
  );
};

export default SignInButton;
