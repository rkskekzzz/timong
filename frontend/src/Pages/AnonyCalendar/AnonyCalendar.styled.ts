import styled from 'styled-components';
import NumberEx from 'src/Common/NumberEx';

import { Box } from '@mui/material';

const AnonyCalendar = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
`;

const Body = styled.div`
  flex: 1 1 0;
  width: 100vw;
  max-width: ${NumberEx.calendarMaxWidth};
  margin: 0 auto;
  padding-top: 60px;
`;

const Styled = { AnonyCalendar, Body };

export default Styled;
