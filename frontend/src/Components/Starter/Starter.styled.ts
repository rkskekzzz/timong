import styled from 'styled-components';
import { Button } from '@mui/material';
import { Slider } from '@mui/material';

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
