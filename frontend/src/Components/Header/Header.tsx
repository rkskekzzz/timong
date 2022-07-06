import React, { useState } from 'react';
import Styled from './Header.styled';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HeaderModal from './HeaderModal';
import { useTheme } from '@mui/material';
import logo from 'src/assets/logo512.png';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{
  calendarName: string;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>> | null;
}> = ({ calendarName, setSelectedIndex }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const theme = useTheme();
  const navi = useNavigate();

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
      <Styled.Header bgcolor={theme.myPalette.backgroundHeader}>
        <div onClick={handleLogoTabbed}>
          <img src={logo} alt="timong logo" />
          <Styled.HeaderAnonyCalendarTitle>
            {setSelectedIndex ? 'Timong' : 'Timong Anony'}
          </Styled.HeaderAnonyCalendarTitle>
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
