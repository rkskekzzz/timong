import React from 'react';
import { Typography } from '@mui/material';
import Styled from './Header.styled';
import AddLinkIcon from '@mui/icons-material/AddLink';

const Header = () => {
  return (
    <Styled.TitleComponent>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Timong
      </Typography>
      <AddLinkIcon />
    </Styled.TitleComponent>
  );
};

export default Header;
