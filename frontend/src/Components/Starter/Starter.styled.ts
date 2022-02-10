import styled, { keyframes } from 'styled-components';
import { Button } from '@mui/material';

const down = keyframes`
  0% {
    transform: translateY(-500px);
  }
  50% {
    transform: translateY(0px) rotate(5deg);
  }
  75% {
    transform: translateY(-5px) rotate(-6deg);
  }
  85% {
    transform: translateY(0px) rotate(-6deg);
  }
  100% {
    transform: translateY(0px) rotate(1deg);
  }
`;

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

const Starter = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const StarterModalForm = styled.form`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  b {
    position: absolute;
    bottom: 50px;
    font-size: 0.7rem;
    text-align: center;
  }
`;

const StarterModalButton = styled(Button)`
  && {
    width: 100%;
    background: #f995f0;
    :hover {
      background: #f995f0;
    }
  }
`;
const StarterModalTitle = styled.span`
  font-size: 3rem;
  font-weight: bold;
  .t {
    position: absolute;
    animation: ${down} ease-out 3s, ${shake} linear infinite 3s;
    animation-delay: 0ms, 3s;
  }
  b {
    position: absolute;
    animation: ${shake} linear infinite 3s;
    animation-delay: 3s;
  }
  i {
    color: transparent;
  }
`;

const StarterModalMaxText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(50%);
`;

const StarterModalNumberBox = styled.span`
  display: flex;
  width: 200px;
  left: 50%;
  gap: 10px;
  justify-content: space-between;
  span {
    margin: auto 0;
    font-size: 1.2rem;
  }
  p {
    font-weight: bold;
  }

  input {
    width: 50px;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    background: transparent;
    border: 0px;
  }
`;
const Styled = {
  Starter,
  StarterModalForm,
  StarterModalButton,
  StarterModalMaxText,
  StarterModalTitle,
  StarterModalNumberBox,
};

export default Styled;
