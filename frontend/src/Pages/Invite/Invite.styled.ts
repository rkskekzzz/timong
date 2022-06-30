import styled from 'styled-components';

const InviteBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .flex {
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      text-align: center;
    }
  }
`;

const Styled = {
  InviteBox,
};

export default Styled;
