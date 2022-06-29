import styled from 'styled-components';

const Card = styled.span<{ fgcolor: string; selected: boolean }>`
  width: 40vw;
  @media (max-width: 760px) {
    width: 90vw;
  }
  max-width: 400px;
  background: ${(props) => `${props.selected ? '#00000011' : '#ffffff11'}`};
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => `${props.selected ? '#f995f0' : '#ffffff00'}`};
  align-self: flex-end;
  border-radius: 10px;
  cursor: pointer;
  color: ${(props) => `${props.fgcolor}`};
  box-shadow: 0px 4px 2px -2px rgb(0, 0, 0, 0.2),
    0px 2px 2px 0px rgb(0, 0, 0, 0.14), 0px 2px 6px 0px rgb(0, 0, 0, 0.12);

  h2,
  p {
    padding: 0;
    margin: 0;
  }
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      height: 50px;
      & {
        color: ${(props) => props.fgcolor};
      }
      p {
        padding-left: 10px;
      }
    }
  }

  .add {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      color: ${(props) => props.fgcolor};
      font-size: 2rem;
    }
  }
`;

const Styled = { Card };

export default Styled;
