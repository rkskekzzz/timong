import React from 'react';
import Styled from './Error.styled';
const Error = () => {
  return (
    <Styled.ErrorBox>
      <div>
        <h1>404</h1>
        <h3>Page Not Found..</h3>
      </div>
      <span>
        <b className="t">T</b>
        <b className="i">i</b>
        <b className="m">m</b>
        <b className="o">o</b>
        <b className="n">n</b>
        <b className="g">g</b>
      </span>
    </Styled.ErrorBox>
  );
};

export default Error;
