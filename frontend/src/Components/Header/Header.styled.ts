import styled from 'styled-components';

const Header = styled.div<{ isPinned: boolean; bgcolor: string }>`
  position: fixed;
  // z-index: 0;
  top: 0;
  left: auto;
  right: 0;
  height: 60px;
  width: 100%;
  display: flex;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
    rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
  background: ${(props) => props.bgcolor || '#f2f2f2'};
  ${(props) => {
    if (!props.isPinned)
      return `
        transition: transform 250ms linear 0ms, border-radius 250ms, background 250ms;
        transform: scale(0.6);
        border-radius: 30px;
        background: #f995f0;
      `;
    else
      return `
        transition: transform 250ms linear 0ms, border-radius 250ms, background 250ms;
        transform: scale(1);
        border-radius: 0px;
      `;
  }};
`;

const HeaderFlexDiv = styled.div`
  display: flex;
  padding: 10px 20px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTimongTitle = styled.span<{ isPinned: boolean }>`
  position: absolute;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6ff2;
  ${(props) => {
    if (!props.isPinned)
      return `
        transition: transform 250ms linear 0ms, opacity 200ms;
        transform: translateY(-30px);
        opacity: 0;
      `;
    else
      return `
        transition: transform 250ms ease-out 0ms, opacity 200ms;
        opacity: 1;
        `;
  }};
`;
const HeaderCalendarTitle = styled.span<{ isPinned: boolean; color: string }>`
  font-size: 0.7rem;
  position: relative;
  font-weight: bold;
  color: ${(props) => props.color || '#6a6a6a'};
  ${(props) => {
    if (!props.isPinned)
      return `
        transition: transform 250ms linear 0ms, color 250ms;
        transform: scale(2) translateX(20px);
        color: white;
  `;
    else
      return `
        transition: transform 250ms linear 0ms, color 250ms;
        transform: translateY(17px) ;
        `;
  }};
`;

const Styled = {
  Header,
  HeaderFlexDiv,
  HeaderCalendarTitle,
  HeaderTimongTitle,
};

export default Styled;
