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
  gap: 30px;
`;

const StarterModalButton = styled(Button)`
  && {
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
const StaterModalSlider = styled(Slider)`
  color: white;
  && {
    color: transparent;
    box-shadow: 0px;
  }
  && :before {
    box-shadow: 0px 0px 0px white;
  }
  && span {
    width: 300px;
    height: 100px;
    border-radius: 0px;
  }
  && :hover {
    box-shadow: 0px 0px 0px white;
  }
`;
const StarterModalNumber = styled.span`
  font-size: 2rem;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
`;
const Styled = {
  Starter,
  StarterModalForm,
  StarterModalButton,
  StaterModalSlider,
  StarterModalTitle,
  StarterModalNumber,
};

export default Styled;
