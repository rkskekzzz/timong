import styled from 'styled-components';

const AutoSizerWrapper = styled.div`
  flex: 1 1 0;
  max-width: 400px;
  position: relative;
  overflow: hidden;
  .list::-webkit-scrollbar {
    display: none;
  }
  .calendar-box {
    height: 100%;
    position: relative;
    overflow: scroll;
  }
`;
const Styled = { AutoSizerWrapper };

export default Styled;
