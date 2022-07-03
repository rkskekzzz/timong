import styled from 'styled-components';
import { Box } from '@mui/material';

const SignedCalendar = styled(Box)`
  width: 100%;
  height: 100vh;

  .container {
    width: 100%;
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .body-box {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;

const Body = styled.div<{ bgcolor: string }>`
  width: 100%;
  max-width: 1024px;
  height: calc(100vh - 60px);
  overflow: hidden;
  display: flex;

  .responsive {
    width: 100%;
    background: ${(props) => props.bgcolor};
  }

  .nocalendar {
    color: #ffffff;
    @media (max-width: 760px) {
      color: transparent !important;
    }
    height: 100%;
    transition: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 760px) {
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
