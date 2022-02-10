import React, { useState, useCallback, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Styled from './HeaderModal.styled';
import { ThemeContext } from '../Timong';
import Snackbar from '@mui/material/Snackbar';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const navi = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleClick = useCallback((link: string) => {
    window.open(link);
  }, []);
  const handleCloseButton = useCallback(() => {
    handleModalClose();
  }, [handleModalClose]);
  const theme = useContext(ThemeContext);
  const handleThemeChangeButton = toggleMode;

  const style = {
    color: theme.iconSmall,
    transition: 'color 500ms ease-in-out 0ms',
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Copy To Clipboard!
        </Alert>
      </Snackbar>
      <Styled.ModalBox>
        <CloseIcon onClick={handleCloseButton} fontSize="medium" sx={style} />
        <CopyToClipboard text={window.location.href}>
          <Styled.ModalTextButton color={theme.iconSmall} onClick={handleOpen}>
            Share Link
          </Styled.ModalTextButton>
        </CopyToClipboard>
        <Styled.ModalTextButton
          color={theme.iconSmall}
          onClick={handleThemeChangeButton}
        >
          {theme.mode === 'light' ? 'Dark Mode   ' : 'Light Mode   '}
        </Styled.ModalTextButton>
        <Styled.ModalTextButton
          onClick={() => navi('/')}
          color={theme.iconSmall}
        >
          New Calendar
        </Styled.ModalTextButton>
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

  const ForwardFC = React.forwardRef(function ForwardFCCallback(
    props: any,
    ref: any
  ) {
    return (
      <span {...props} ref={ref}>
        {props.children}
      </span>
    );
  });

  return (
    <Styled.ColoredModal
      open={isShowModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      color={theme.backDropHeader}
    >
      <ForwardFC>
        <ModalBoxForm
          handleModalClose={handleModalClose}
          toggleMode={toggleMode}
        />
      </ForwardFC>
    </Styled.ColoredModal>
  );
};

export default HeaderModal;
