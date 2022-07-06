import styled from 'styled-components';

const AutoSizerWrapper = styled.div`
  flex: 1 1 0;
  max-width: 400px;
  margin: auto;
  height: calc(100vh - 60px);
  overflow: scroll;
  .list::-webkit-scrollbar {
    display: none;
  }
`;
const Styled = { AutoSizerWrapper };

export default Styled;
