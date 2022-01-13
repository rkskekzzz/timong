import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Styled from './Header.styled';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { throttle } from 'lodash';

let prev_windows_scrollY = 0;

const Header = () => {
  const [isTop, setIsTop] = useState<boolean>(false);
  const [isPinned, setIsPinned] = useState<boolean>(true);
  // const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (_e: Event) => {
      // if (window.scrollY < 64) setIsTop(true);
      // else setIsTop(false);
      if (window.scrollY < prev_windows_scrollY) {
        prev_windows_scrollY = window.scrollY;
        setIsPinned(true);
      } else {
        prev_windows_scrollY = window.scrollY;
        setIsPinned(false);
      }
    };
    window.addEventListener('scroll', throttle(handleScroll, 200));
    return () => {
      window.removeEventListener('scroll', throttle(handleScroll, 200));
    };
  }, []);

  return (
    <Styled.Header isPinned={isPinned}>
      <Styled.HeaderFlexDiv>
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Timong
        </Typography>
        <AddLinkIcon />
      </Styled.HeaderFlexDiv>
    </Styled.Header>
  );
};

export default Header;
