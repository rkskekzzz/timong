import React from 'react';
import { Modal } from '@mui/material';
import Styled from './HeaderModal.styled';

const HeaderModal: React.FC<{
  isShowModal: boolean;
  handleModalClose: () => void;
}> = ({ isShowModal, handleModalClose }) => {
  return (
    <Modal
      open={isShowModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Styled.ModalBox>hi!</Styled.ModalBox>
    </Modal>
  );
};

export default HeaderModal;
