import styled from 'styled-components';

const AutoSizerWrapper = styled.div`
  flex: 1 1 0;
  max-width: 400px;
  position: relative;
  height: calc(100% - 60px);
  .list::-webkit-scrollbar {
    display: none;
  }
`;
const Styled = { AutoSizerWrapper };

export default Styled;
