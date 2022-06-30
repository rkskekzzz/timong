import React, { useState, useContext, useEffect } from 'react';
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
import { getAuth } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const SignInButton = () => {
  const { state, dispatch } = useContext(UserContext);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const navi = useNavigate();
  const asdf = () => {
    signInWithRedirect(auth, provider)
      .then((result: any) => {
        setIsSignedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const zxcv = () => {
    signOut(auth);
  };
  useEffect(() => {
    if (user) navi('/calendar');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'SIGNIN', uid: user.uid });
        navi('/calendar');
      }
    });
  }, [isSignedIn]);

  return (
    <>
      <Styled.GoogleButton onClick={asdf}>
        <GoogleButtonLogo>hi</GoogleButtonLogo>
        <p>Sign in with Google</p>
      </Styled.GoogleButton>
      {/* <Styled.GoogleButton onClick={zxcv}>
        <GoogleButtonLogo>hi</GoogleButtonLogo>
        <p>Sign in with Google</p>
      </Styled.GoogleButton> */}
    </>
  );
};

export default SignInButton;
