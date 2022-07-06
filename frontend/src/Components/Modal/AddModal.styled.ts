import styled from 'styled-components';
import { Button } from '@mui/material';

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background: white;
  border: '2px solid #000';
  border-radius: 15px;
  padding: 20px;
  outline: none;
  border: 0px;
  transition: all 0.5s ease-in-out;
`;

const ModalBoxForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
`;

const ModalBoxSpan = styled.span`
  font-size: 1.1rem;
  width: 100%;
`;

const ModalBoxButton = styled(Button)`
  && {
    width: 100%;
    background: #f995f0;
    :hover {
      background: #f995f0;
    }
  }
`;

const Styled = { ModalBox, ModalBoxForm, ModalBoxButton, ModalBoxSpan };

export default Styled;
