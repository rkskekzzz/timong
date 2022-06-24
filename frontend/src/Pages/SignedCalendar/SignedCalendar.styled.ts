import styled from 'styled-components';
import { Box } from '@mui/material';

const SignedCalendar = styled(Box)`
  width: 100%;
  height: 100vh;

  .container {
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Body = styled.div<{ bgcolor: string }>`
  height: calc(100vh - 60px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  gap: 60px;

  .body-box {
    display: flex;
    max-width: 1024px;
  }
  .responsive {
    background: ${(props) => props.bgcolor};
  }

  @media (min-width: 760px) {
    div {
      flex: 1 1 0;
    }
  }
  @media (max-width: 760px) {
    /* justify-content: center; */
    .responsive {
      z-index: 1000;
      position: fixed;
      width: 100%;
    }
    .hidden {
      right: -100%;
      transition: all 0.5s;
    }
    .show {
      right: 0%;
      transition: all 0.5s;
    }
  }
`;

const Styled = { SignedCalendar, Body };

export default Styled;
