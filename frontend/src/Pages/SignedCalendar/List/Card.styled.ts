import styled from 'styled-components';

const Card = styled.span<{
  fgcolor: string;
  selected: boolean;
  bgcolor: string;
  bordercolor: string;
  mode: string;
}>`
  width: 80%;
  @media (max-width: 768px) {
    width: 87%;
  }
  display: flex;
  /* align-items: center; */
  max-width: 400px;
  background: ${(props) =>
    `${
      props.bgcolor
        ? props.selected
          ? props.bgcolor +
            (props.mode === 'dark'
              ? props.bgcolor === '#ffffff'
                ? '00'
                : '80'
              : props.bgcolor === '#000000'
              ? '00'
              : '90')
          : props.bgcolor +
            (props.mode === 'dark'
              ? props.bgcolor === '#ffffff'
                ? '14'
                : '33'
              : props.bgcolor === '#000000'
              ? '07'
              : '44')
        : '#ffffff11'
    }`};
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    `${props.selected ? props.bordercolor + 66 : '#ffffff00'}`};

  border-radius: 10px;
  cursor: pointer;
  color: ${(props) => `${props.fgcolor}`};
  box-shadow: 0px 4px 2px -2px rgb(0, 0, 0, 0.1),
    0px 2px 2px 0px rgb(0, 0, 0, 0.07), 0px 2px 6px 0px rgb(0, 0, 0, 0.06);

  h2,
  p {
    padding: 0;
    margin: 0;
  }
  .list {
    width: 100%;
    display: flex;
    justify-content: space-between;
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

    span {
      color: ${(props) => props.fgcolor};
      font-size: 2rem;
    }
  }
`;

const Styled = { Card };

export default Styled;
