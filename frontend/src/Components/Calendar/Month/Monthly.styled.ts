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

  .list {
    display: flex;
    flex-direction: row;

    span {
      flex-basis: 50vw;
      flex-grow: 1;
    }
  }
`;

const UserDrawer = styled(SwipeableDrawer)<{
  bgcolor: string;
  bgdropcolor: string;
}>`
  .MuiBackdrop-root {
    background-color: ${(props) => props.bgdropcolor || '#00000080'};
  }
  .MuiPaper-root {
    background-color: ${(props) => props.bgcolor || '#00000080'};
    border-radius: 20px 20px 0px 0px;
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
