import styled from 'styled-components';

const Card = styled.span<{ fgcolor: string }>`
  width: 40vw;
  @media (max-width: 760px) {
    width: 90vw;
  }
  max-width: 400px;
  height: 100px;
  padding: 1rem;
  background: #ffffff11;
  align-self: flex-end;
  border-radius: 10px;
  color: ${(props) => `${props.fgcolor}`};
  box-shadow: 0px 4px 2px -2px rgb(0, 0, 0, 0.2),
    0px 2px 2px 0px rgb(0, 0, 0, 0.14), 0px 2px 6px 0px rgb(0, 0, 0, 0.12);
  cursor: pointer;
  :hover {
  }
  h2,
  p {
    padding: 0;
    margin: 0;
  }
  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 3rem;
    }
  }
`;

const Styled = { Card };

export default Styled;
