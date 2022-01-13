import styled from 'styled-components';

const Body = styled.div`
  max-width: 400px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Styled = { Body };

export default Styled;
