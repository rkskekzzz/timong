import React, { useState } from 'react';
import Styled from './Header.styled';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HeaderModal from './HeaderModal';
import { useTheme } from '@mui/material';
import logo from 'src/assets/logo512.png';

const Header: React.FC<{ calendarName: string }> = ({ calendarName }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const theme = useTheme();

  const handleModalOpen = () => setIsShowModal(true);
  const handleModalClose = () => setIsShowModal(false);

  return (
    <>
      <HeaderModal
        isShowModal={isShowModal}
        handleModalClose={handleModalClose}
      />
      <Styled.Header bgcolor={theme.myPalette.backgroundHeader}>
        <div>
          <img src={logo} alt="timong logo" />
          <Styled.HeaderAnonyCalendarTitle>
            Timong
          </Styled.HeaderAnonyCalendarTitle>
        </div>
        <Styled.HeaderCalendarTitle color={theme.myPalette.foregroundHeader}>
          {calendarName}
        </Styled.HeaderCalendarTitle>
        <MenuRoundedIcon
          sx={{
            color: 'white',
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
