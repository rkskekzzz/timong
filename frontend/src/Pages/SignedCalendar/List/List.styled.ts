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

const Card = styled.span`
  width: 40vw;
  height: 100px;
  background: #ffffff66;
  border-radius: 10px;
`;

const Styled = { List, Card };

export default Styled;
