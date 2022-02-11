import React, { useState, useEffect, useCallback } from 'react';
import Styled from './Header.styled';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import throttle from 'lodash/throttle';
import HeaderModal from './HeaderModal';
import { useTheme } from '@mui/material';

let prev_windows_scrollY = 0;

const Header: React.FC<{ toggleMode: () => void; calendarName: string }> = ({
  toggleMode,
  calendarName,
}) => {
  const [isPinned, setIsPinned] = useState<boolean>(true);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const theme = useTheme();

  const handleScroll = useCallback(() => {
    if (window.scrollY < 10) {
      setIsPinned(false);
    }
    if (window.scrollY < prev_windows_scrollY) {
      prev_windows_scrollY = window.scrollY;
      setIsPinned(true);
    } else {
      prev_windows_scrollY = window.scrollY;
      setIsPinned(false);
    }
  }, [setIsPinned]);

  const handleModalOpen = () => setIsShowModal(true);
  const handleModalClose = () => setIsShowModal(false);

  useEffect(() => {
    window.addEventListener('scroll', throttle(handleScroll, 300));
    return () => {
      window.removeEventListener('scroll', throttle(handleScroll, 300));
    };
  }, []);

  return (
    <>
      <HeaderModal
        isShowModal={isShowModal}
        handleModalClose={handleModalClose}
        toggleMode={toggleMode}
      />
      <Styled.Header
        isPinned={isPinned}
        bgcolor={theme.myPalette.backgroundHeader}
      >
        <Styled.HeaderTimongTitle isPinned={isPinned}>
          Timong
        </Styled.HeaderTimongTitle>
        <Styled.HeaderCalendarTitle
          isPinned={isPinned}
          color={theme.myPalette.foregroundHeader}
        >
          {calendarName}
        </Styled.HeaderCalendarTitle>
        <MenuRoundedIcon
          sx={{
            color: isPinned ? '#ff6ff2' : 'white',
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
