import styled from 'styled-components';

const TitleComponent = styled.div<{ isPin: boolean }>`
  position: fixed;
  z-index: 1100;
  top: 0;
  left: auto;
  right: 0;
  background-color: #679fff;
  height: 55px;
  width: 100%;
  display: flex;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
    rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;

  ${(props) => {
    if (props.isPin)
      return `
        transition: transform 300ms ease-in-out 0ms;
        transform: translateX(-40px);
      `;
    else
      return `
        transition: transform 200ms ease-in-out 0ms;
        `;
  }};
`;

export default { TitleComponent };
