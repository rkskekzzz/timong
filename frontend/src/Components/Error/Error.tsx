import React from 'react';
import Styled from './Error.styled';
import GlobalStyled from '../GlobalStyled.styled';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navi = useNavigate();
  return (
    <Styled.ErrorBox onClick={() => navi('/')}>
      <span>
        <b>T</b>
        <i>T</i>
        <b>i</b>
        <i>i</i>
        <b>m</b>
        <i>m</i>
        <b>o</b>
        <i>o</i>
        <b>n</b>
        <i>n</i>
        <b>g</b>
        <i>g</i>
        <b>!</b>
        <i>!</i>
      </span>
      <div className="flex">
        <h1>
          40<b>4</b>
        </h1>
        <h3>Page Not Found..</h3>
        <h4>Press anywhere to Home</h4>
      </div>
      <GlobalStyled.Cloud bgcolor="#ffd8fb">
        <div className="clouds">
          <div className="cloud x1" />
          <div className="cloud x2" />
          <div className="cloud x3" />
          <div className="cloud x4" />
          <div className="cloud x5" />
        </div>
      </GlobalStyled.Cloud>
    </Styled.ErrorBox>
  );
};

export default Error;
