import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ThemeContext } from '../Timong';
import Styled from './Header.styled';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Backdrop } from '@mui/material';
import { throttle } from 'lodash';
import HeaderModal from './HeaderModal';

let prev_windows_scrollY = 0;

const Header: React.FC<{ toggleMode: () => void }> = ({ toggleMode }) => {
  const [isPinned, setIsPinned] = useState<boolean>(true);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const theme = useContext(ThemeContext);

  const handleScroll = useCallback(() => {
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
      <Styled.Header isPinned={isPinned} bgcolor={theme.backgroundHeader}>
        <Styled.HeaderFlexDiv>
          <Styled.HeaderTimongTitle isPinned={isPinned}>
            Timong
          </Styled.HeaderTimongTitle>
          <Styled.HeaderCalendarTitle
            isPinned={isPinned}
            color={theme.foregroundHeader}
          >
            init6 회식 일정!
          </Styled.HeaderCalendarTitle>
          <MenuRoundedIcon
            sx={{
              color: isPinned ? '#ff6ff2' : 'white',
              transform: 'scale(1.2)',
              transition: 'transform 500ms linear 0ms, color 500ms',
            }}
            fontSize="medium"
            onClick={handleModalOpen}
          />
        </Styled.HeaderFlexDiv>
      </Styled.Header>
    </>
  );
};

export default Header;
