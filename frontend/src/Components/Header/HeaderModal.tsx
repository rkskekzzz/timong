import React, { useState, useCallback, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Styled from './HeaderModal.styled';
import Snackbar from '@mui/material/Snackbar';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { UserContext } from 'src/App';

const githubLink = 'https://github.com/rkskekzzz/blockcalendar.git';
const emailLink = 'mailto:wkdlfflxh@naver.com';
const articleLink = 'https://80000coding.oopy.io';

function ModalBoxForm({ handleModalClose }: { handleModalClose: () => void }) {
  const { dispatch } = useContext(UserContext);
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
  const handleThemeChangeButton = () => {
    dispatch({
      type: 'CHANGEMODE',
      mode: theme.myPalette.mode === 'light' ? 'dark' : 'light',
    });
  };
  const handleCloseButton = useCallback(() => {
    handleModalClose();
  }, [handleModalClose]);
  const theme = useTheme();

  const style = {
    color: theme.myPalette.iconSmall,
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
          <Styled.ModalTextButton
            color={theme.myPalette.iconSmall}
            onClick={handleOpen}
          >
            공유하기
          </Styled.ModalTextButton>
        </CopyToClipboard>
        <Styled.ModalTextButton
          color={theme.myPalette.iconSmall}
          onClick={handleThemeChangeButton}
        >
          {theme.myPalette.mode === 'light' ? '어두운 테마' : '밝은 테마'}
        </Styled.ModalTextButton>
        <Styled.ModalTextButton
          onClick={() => navi('/anony')}
          color={theme.myPalette.iconSmall}
        >
          익명으로 사용하기
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
}> = ({ isShowModal, handleModalClose }) => {
  const theme = useTheme();

  const ForwardFC = React.forwardRef(function ForwardFCCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      color={theme.myPalette.backDropHeader}
    >
      <ForwardFC>
        <ModalBoxForm handleModalClose={handleModalClose} />
      </ForwardFC>
    </Styled.ColoredModal>
  );
};

export default HeaderModal;
