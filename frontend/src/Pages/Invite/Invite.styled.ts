import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  0% {
    transform: rotate(1deg);
  }
  50%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
`;
const InviteBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .flex {
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      text-align: center;
    }
  }
  span {
    z-index: 1000;
    top: 30%;
    color: #ff9ef5;
    position: absolute;
    font-size: 3rem;
    font-weight: bold;
    .t {
      position: absolute;
      animation: ${shake} linear infinite 3s;
    }
    b {
      position: absolute;
      animation: ${shake} linear infinite 3s;
    }
    i {
      color: transparent;
    }
  }
`;

const Styled = {
  InviteBox,
};

export default Styled;
