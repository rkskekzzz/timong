import React, { useContext, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  // getRedirectResult,
  signOut,
} from 'firebase/auth';
import { auth } from 'src/firebase';
import Styled from './SignInButton.styled';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as GoogleButtonLogo } from 'src/assets/btn_google_light_normal_ios.svg';
import { UserContext } from 'src/App';

const provider = new GoogleAuthProvider();

const SignInButton = () => {
  const { dispatch } = useContext(UserContext);
  const navi = useNavigate();
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
      if (user) {
        dispatch({ type: 'SIGNIN' });
        console.log(user);
        // navi('/calendar');
      }
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
      <Styled.GoogleButton onClick={zxcv}>
        <GoogleButtonLogo>hi</GoogleButtonLogo>
        <p>Sign in with Google</p>
      </Styled.GoogleButton>
    </>
  );
};

export default SignInButton;
