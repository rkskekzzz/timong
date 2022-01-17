import React, { useCallback, useContext } from 'react';
import { Modal } from '@mui/material';
import Styled from './HeaderModal.styled';
import { ThemeContext } from '../Timong';

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
  const theme = useContext(ThemeContext);
  const handleThemeChangeButton = toggleMode;

  const style = {
    color: theme.iconSmall,
    transition: 'color 500ms ease-in-out 0ms',
  };

  return (
    <>
      <Styled.ModalBox>
        <CloseIcon onClick={handleCloseButton} />
        <div style={style}>새 링크 생성</div>
        <div style={style} onClick={handleThemeChangeButton}>
          테마 변경
        </div>
        <Styled.ModalBoxButtons>
          <GitHubIcon onClick={() => handleClick(githubLink)} sx={style} />
          <EmailIcon onClick={() => handleClick(emailLink)} sx={style} />
          <ArticleIcon onClick={() => handleClick(articleLink)} sx={style} />
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
  const theme = useContext(ThemeContext);

  return (
    <Styled.ColoredModal
      open={isShowModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      color={theme.backDropHeader}
    >
      <>
        <ModalBoxForm
          handleModalClose={handleModalClose}
          toggleMode={toggleMode}
        />
      </>
    </Styled.ColoredModal>
  );
};

export default HeaderModal;
