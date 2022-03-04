import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';

const Weekly = () => {
  const theme = useTheme();

  return <Box bgcolor={theme.myPalette.background}>여기는 위클리!</Box>;
};

export default Weekly;
