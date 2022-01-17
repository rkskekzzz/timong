import styled from 'styled-components';
import { Modal } from '@mui/material';

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  gap: 50px;
  font-size: 1.6rem;
  color: white;
  border-radius: 15px;
  padding: 5%;
`;

const ModalBoxButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 17px;
`;

const ColoredModal = styled(Modal)<{ color: string }>`
  .MuiBackdrop-root {
    background: ${(props) => props.color || '#f2f2f2'};
  }
`;

const ModalTextButton = styled.span`
  font-weight: bold;
`;

const Styled = {
  ModalBox,
  ModalBoxButtons,
  ModalTextButton,
  ColoredModal,
};

export default Styled;
