import styled from 'styled-components';

const SignedCalendar = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  .container {
    flex: 1 1 0;
    overflow: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    .body {
      padding-top: 60px;
      height: calc(100vh - 60px);
      overflow: hidden;
      display: flex;
      div {
        flex: 1 1 0;
      }
    }
  }
`;

const Styled = { SignedCalendar };

export default Styled;
