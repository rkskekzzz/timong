import React, { useState, useContext } from 'react';
import Styled from './Header.styled';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HeaderModal from './HeaderModal';
import { useTheme } from '@mui/material';
import logo from 'src/assets/logo512.png';
import { UserContext } from 'src/App';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{
  calendarName: string;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>> | null;
  isUserCreated: number;
}> = ({ calendarName, setSelectedIndex, isUserCreated }) => {
  const theme = useTheme();
  const navi = useNavigate();
  const { state } = useContext(UserContext);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleModalOpen = () => setIsShowModal(true);
  const handleModalClose = () => setIsShowModal(false);
  const handleLogoTabbed = () => {
    if (setSelectedIndex) {
      setSelectedIndex(-1);
      navi('/calendar');
    } else {
      navi('/');
    }
  };

  return (
    <>
      <HeaderModal
        isShowModal={isShowModal}
        handleModalClose={handleModalClose}
      />
      <Styled.Header
        bgcolor={theme.myPalette.backgroundHeader}
        fgcolor={
          isUserCreated < 0
            ? null
            : state.users[isUserCreated].color ===
              theme.myPalette.foregroundAddButton
            ? theme.myPalette.backgroundAddButton
            : state.users[isUserCreated].color
        }
      >
        <div className="logo-box" onClick={handleLogoTabbed}>
          <img src={logo} alt="timong logo" />
          <h3>{setSelectedIndex ? 'Timong' : 'Timong Anony'}</h3>
        </div>
        {calendarName !== 'no' ?? (
          <Styled.HeaderCalendarTitle color={theme.myPalette.foregroundHeader}>
            {calendarName}
          </Styled.HeaderCalendarTitle>
        )}
        <MenuRoundedIcon
          sx={{
            color: theme.myPalette.foreground,
            transform: 'scale(1.2)',
            transition: 'transform 500ms linear 0ms, color 500ms',
            cursor: 'pointer',
            flexGrow: '0',
          }}
          fontSize="medium"
          onClick={handleModalOpen}
        />
      </Styled.Header>
    </>
  );
};

export default Header;
