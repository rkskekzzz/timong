import styled, { keyframes } from 'styled-components';
import { Modal } from '@mui/material';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  gap: 40px;
  font-size: 1.6rem;
  border-radius: 15px;
  padding: 15px;
  border: 0px;
  outline: none;
`;

const ModalBoxButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 17px;
`;

const ColoredModal = styled(Modal)<{ color: string }>`
  && {
    animation: ${fadeIn} 500ms;
  }
  .MuiBackdrop-root {
    background: ${(props) => props.color || '#f2f2f2'};
  }
`;

const ModalTextButton = styled.span<{ color: string }>`
  font-weight: bold;
  transition: color 500ms ease-in-out 0ms;
  color: ${(props) => props.color || '#000'};
  cursor: pointer;
`;

const Styled = {
  ModalBox,
  ModalBoxButtons,
  ModalTextButton,
  ColoredModal,
};

export default Styled;
