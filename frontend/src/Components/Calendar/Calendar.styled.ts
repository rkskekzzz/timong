import styled from 'styled-components';
import { SwipeableDrawer } from '@mui/material';
import { Box } from '@mui/material';

const UserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const UserList = styled.div`
  border-radius: 15px 15px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserDrawer = styled(SwipeableDrawer)<{ bgcolor: string }>`
  .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop {
    background-color: ${(props) => props.bgcolor || '#00000080'};
  }
  .css-9emuhu-MuiPaper-root-MuiDrawer-paper {
    background-color: #ffffff;
    border-radius: 20px 20px 0 0;
    width: calc(100% - 60px);
    padding: 30px;
  }
`;

const DayLabel = styled.span`
  font-size: 1.5rem;
`;

const Puller = styled(Box)`
  && {
    width: 60px;
    height: 6px;
    background-color: grey;
    border-radius: 3px;
    position: absolute;
    top: 8px;
    left: calc(50% - 30px);
  }
`;

const Styled = {
  DayLabel,
  UserDrawer,
  UserList,
  UserBox,
  Puller,
};

export default Styled;
