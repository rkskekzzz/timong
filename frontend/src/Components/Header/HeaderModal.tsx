import React, { useCallback } from 'react';
import { Modal } from '@mui/material';
import Styled from './HeaderModal.styled';

import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';

const githubLink = 'https://github.com/rkskekzzz/blockcalendar.git';
const emailLink = 'mailto:wkdlfflxh@naver.com';
const articleLink = 'https://80000coding.oopy.io';

function ModalBoxForm({ handleModalClose }: { handleModalClose: () => void }) {
  const handleClick = useCallback((link: string) => {
    window.open(link);
  }, []);
  const handleClseButton = useCallback(() => {
    handleModalClose();
  }, []);
  return (
    <>
      <Styled.ModalBox>
        <CloseIcon onClick={handleClseButton} />
        <div>새 링크 생성</div>
        <div> 테마 변경</div>
        <Styled.ModalBoxButtons>
          <GitHubIcon onClick={() => handleClick(githubLink)} />
          <EmailIcon onClick={() => handleClick(emailLink)} />
          <ArticleIcon onClick={() => handleClick(articleLink)} />
        </Styled.ModalBoxButtons>
      </Styled.ModalBox>
    </>
  );
}

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
      <>
        <ModalBoxForm handleModalClose={handleModalClose} />
      </>
    </Modal>
  );
};

export default HeaderModal;
