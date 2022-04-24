import styled from 'styled-components';

const List = styled.div`
  width: 100%;
  display: block;

  overflow: scroll;
  .list-box {
    padding: 25px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }
`;

const Styled = { List };

export default Styled;
