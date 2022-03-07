import styled from 'styled-components';
import NumberEx from 'src/Common/NumberEx';
import { Box } from '@mui/material';

const UserList = styled.div`
  border-radius: 15px 15px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .list-header {
      display: flex;
      justify-content: space-between;
      b,
      p {
        padding: 0;
        margin: 0;
      }
      b {
        font-weight: 300;
      }
    }
  }
`;

const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  .userinfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
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

const UserDrawer = styled.div<{
  isShow: boolean;
  bgcolor: string;
  bgdropcolor: string;
  fgcolor: string;
}>`
  z-index: 1000;
  position: fixed;
  box-sizing: border-box;
  left: 50%;
  bottom: 0;
  width: 100%;
  max-width: ${NumberEx.calendarMaxWidth};
  padding: 30px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${(props) => props.bgcolor || '#00000080'};
  transition: all 0.5s ease-in-out 0s;
  * {
    color: ${(props) => props.fgcolor || '#ffffff'};
  }
  ${(props) => {
    if (props.isShow) {
      return `
        transform: translate(-50%, 0);
      `;
    } else {
      return `
        transform: translate(-50%, 100%);
      `;
    }
  }}
`;

const Styled = {
  UserDrawer,
  UserBox,
  UserList,
  Puller,
};

export default Styled;
