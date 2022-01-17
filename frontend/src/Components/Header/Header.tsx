import React, { useState, useEffect, useCallback } from 'react';
import Styled from './Header.styled';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Backdrop } from '@mui/material';
import { throttle } from 'lodash';
import HeaderModal from './HeaderModal';

let prev_windows_scrollY = 0;

const Header = () => {
  const [isPinned, setIsPinned] = useState<boolean>(true);
  const [isShowModal, setIsShowModal] = useState<boolean>(true);

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

  const handleClick = useCallback(() => {
    setIsShowModal(!isShowModal);
  }, [isShowModal, setIsShowModal]);

  useEffect(() => {
    window.addEventListener('scroll', throttle(handleScroll, 300));
    return () => {
      window.removeEventListener('scroll', throttle(handleScroll, 300));
    };
  }, []);

  return (
    <>
      <Backdrop open={isShowModal} />
      <HeaderModal
        isShowModal={isShowModal}
        handleModalClose={handleModalClose}
      />
      <Styled.Header isPinned={isPinned}>
        <Styled.HeaderFlexDiv>
          <Styled.HeaderTimongTitle isPinned={isPinned}>
            Timong
          </Styled.HeaderTimongTitle>
          <Styled.HeaderCalendarTitle isPinned={isPinned}>
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
