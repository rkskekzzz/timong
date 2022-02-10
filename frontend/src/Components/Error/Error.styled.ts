import styled from 'styled-components';

const ErrorBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  span {
    position: absolute;

    .t {
      color: orange;
    }
  }
`;

const Styled = {
  ErrorBox,
};

export default Styled;
