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
  padding: 15px;
`;

const ModalBoxForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
`;

const ModalBoxSpan = styled.span`
  font-size: 1.1rem;
`;

const ModalBoxButton = styled(Button)`
  && {
    background: #f995f0;
    :hover {
      background: #f995f0;
    }
  }
`;

const Styled = { ModalBox, ModalBoxForm, ModalBoxButton, ModalBoxSpan };

export default Styled;
