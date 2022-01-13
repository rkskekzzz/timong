import styled from 'styled-components';

const Header = styled.div<{ isPinned: boolean }>`
  position: fixed;
  z-index: 1100;
  top: 0;
  left: auto;
  right: 0;
  background-color: white;
  height: 53px;
  width: 100%;
  display: flex;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
    rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;

  ${(props) => {
    if (!props.isPinned)
      return `
        transition: transform 500ms ease-in-out 0ms, border-radius 500ms;
        transform: scale(0.7);
        border-radius: 30px;
      `;
    else
      return `
        transition: transform 500ms ease-in-out 0ms;
        `;
  }};
`;

const HeaderFlexDiv = styled.div`
  display: flex;
  padding: 10px 20px;
  width: 100%;
  justify-contents: space-between;
`;

const Styled = { Header, HeaderFlexDiv };

export default Styled;
