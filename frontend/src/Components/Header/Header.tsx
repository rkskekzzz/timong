import React, { useState, useEffect } from 'react';

import Styled from './Header.styled';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { throttle } from 'lodash';

let prev_windows_scrollY = 0;

const Header = () => {
  const [isPinned, setIsPinned] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = (_e: Event) => {
      // console.log(window.scrollY - prev_windows_scrollY);

      if (window.scrollY < prev_windows_scrollY) {
        prev_windows_scrollY = window.scrollY;
        setIsPinned(true);
      } else {
        prev_windows_scrollY = window.scrollY;
        setIsPinned(false);
      }
    };
    window.addEventListener('scroll', throttle(handleScroll, 300));
    return () => {
      window.removeEventListener('scroll', throttle(handleScroll, 300));
    };
  }, []);

  return (
    <Styled.Header isPinned={isPinned}>
      <Styled.HeaderFlexDiv>
        <Styled.HeaderTimongTitle isPinned={isPinned}>
          Timong
        </Styled.HeaderTimongTitle>
        <Styled.HeaderCalendarTitle isPinned={isPinned}>
          42 Share House
        </Styled.HeaderCalendarTitle>
        <AddLinkIcon
          sx={{
            color: isPinned ? '#ff6ff2' : 'white',
            transform: 'scale(1.2)',
            transition: 'transform 500ms linear 0ms, color 500ms',
          }}
          fontSize="medium"
        />
      </Styled.HeaderFlexDiv>
    </Styled.Header>
  );
};

export default Header;
