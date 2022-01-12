import styled from 'styled-components';

const Temp = styled.div<{ isShow: boolean }>`
  position: absolute;
  bottom: 72px;
  right: 16px;
  display: flex;
  align-items: end;
  flex-direction: column-reverse;
`;

const DialButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 56px;
  height: 56px;
  background: red;
  border-radius: 50%;
  border: 0px solid black;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
`;

const DialBox = styled.div<{ isShow: boolean }>`
  position: relative;
  display: flex;
  align-items: end;
  transition: top 0s linear 0.2s;
  flex-direction: column-reverse;
  margin-bottom: 16px;
  overflow: hidden scroll;
  scroll-behavior: smooth;
  max-height: 504px;
  width: 90vw;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const DialRowDelButton = styled.button`
  position: absolute;
  left: 100%;
`;

const DialRow = styled.span<{ isSwipe: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
  ${(props) => {
    if (props.isSwipe)
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

const DialRowName = styled.span<{ isShow: boolean }>`
  position: relative;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  color: rgba(0, 0, 0, 0.6);
  padding: 4px 16px;
  word-break: keep-all;
  transform-origin: 100% 50%;
  overflow: visible;
  ${(props) => {
    if (props.isShow)
      return `
      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      opacity: 1;
      transform-origin: 100% 50%;
      margin-right: 8px;
    `;
    else
      return `
      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      transform: scale(0.5);
      transform-origin: 100% 50%;
      margin-right: 8px;
      opacity: 0;`;
  }};
`;

const DialRowProfile = styled.button<{ isShow: boolean }>`
  width: 40px;
  height: 40px;
  margin: 8px;
  border-radius: 4px;
  border: 0;
  background: ${(props) => props.color || 'white'};
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  ${(props) => {
    if (props.isShow)
      return `
      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,opacity 0.8s;
      opacity: 1;
    `;
    else
      return `
      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,opacity 0.8s;
      transform: scale(0);
      opacity: 0;`;
  }};
`;

export {
  Temp,
  DialBox,
  DialRow,
  DialButton,
  DialRowName,
  DialRowDelButton,
  DialRowProfile,
};
