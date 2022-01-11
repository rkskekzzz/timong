import React from 'react';
import { Typography } from '@mui/material';
import Styled from './Header.styled';

const Header = () => {
  return (
    <Styled.TitleComponent>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Timong
      </Typography>
    </Styled.TitleComponent>
  );
};

export default Header;
