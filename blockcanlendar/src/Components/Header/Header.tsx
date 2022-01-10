import React from 'react';
import { Typography } from '@mui/material';
import Styled from './Header.styled';

const Header = () => {
  return (
    <Styled.TitleComponent>
      <Typography>Title</Typography>
    </Styled.TitleComponent>
  );
};

export default Header;
