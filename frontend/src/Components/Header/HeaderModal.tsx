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

function ModalBoxForm({
  handleModalClose,
  toggleMode,
}: {
  handleModalClose: () => void;
  toggleMode: () => void;
}) {
  const handleClick = useCallback((link: string) => {
    window.open(link);
  }, []);
  const handleCloseButton = useCallback(() => {
    handleModalClose();
  }, []);
  const handleThemeChangeButton = toggleMode;

  return (
    <>
      <Styled.ModalBox>
        <CloseIcon onClick={handleCloseButton} />
        <div>새 링크 생성</div>
        <div onClick={handleThemeChangeButton}> 테마 변경</div>
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
  toggleMode: () => void;
}> = ({ isShowModal, handleModalClose, toggleMode }) => {
  return (
    <Modal
      open={isShowModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <ModalBoxForm
          handleModalClose={handleModalClose}
          toggleMode={toggleMode}
        />
      </>
    </Modal>
  );
};

export default HeaderModal;
