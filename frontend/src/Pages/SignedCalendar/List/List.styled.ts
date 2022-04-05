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

const Card = styled.span<{ fgcolor: string }>`
  width: 40vw;
  max-width: 400px;
  height: 100px;
  padding: 1rem;
  background: #ffffff11;
  align-self: flex-end;
  border-radius: 10px;
  color: ${(props) => `${props.fgcolor}`};
  box-shadow: 0px 4px 2px -2px rgb(0, 0, 0, 0.2),
    0px 2px 2px 0px rgb(0, 0, 0, 0.14), 0px 2px 6px 0px rgb(0, 0, 0, 0.12);

  h2,
  p {
    padding: 0;
    margin: 0;
  }
`;

const Styled = { List, Card };

export default Styled;
