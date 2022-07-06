import React, { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Styled from './SignInButton.styled';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as GoogleButtonLogo } from 'src/assets/btn_google_light_normal_ios.svg';
import { UserContext } from 'src/App';
import { useSign } from 'src/Utils/firebaseAuth';

const SignInButton = () => {
  const { dispatch } = useContext(UserContext);
  const { auth, isSignedIn, handleSignIn } = useSign();

  const navi = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
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
      <Styled.GoogleButton onClick={handleSignIn}>
        <GoogleButtonLogo>hi</GoogleButtonLogo>
        <p>Sign in with Google</p>
      </Styled.GoogleButton>
    </>
  );
};

export default SignInButton;
