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
  const { state, dispatch } = useContext(UserContext);
  const navi = useNavigate();
  const asdf = () => {
    signInWithRedirect(auth, provider)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const zxcv = () => {
    signOut(auth);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'SIGNIN', uid: user.uid });
        navi('/calendar');
      }
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
