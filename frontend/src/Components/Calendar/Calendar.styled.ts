import styled from 'styled-components';

const CalendarPaddingBox = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  * {
    color: ${(props) => props.color || '#000'};
  }
`;

const UserDrawer = styled.div<{ isShow: boolean }>`
  position: fixed;
  z-index: 100;
  bottom: 0px;
  padding: 1.5rem;
  width: calc(100% - 2px - 3rem);
  max-width: calc(400px - 2px - 3rem);
  border-radius: 15px 15px 0 0;
  background: white;
  ${(props) => {
    if (props.isShow)
      return `
      transition: transform 500ms ease-in-out 0ms;
        `;
    else
      return `
        transition: transform 500ms ease-in-out 0ms;
        transform: translateY(100%);
      `;
  }}
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserList = styled.div``;

const Styled = {
  CalendarPaddingBox,
  UserDrawer,
  UserList,
  UserBox,
};

export default Styled;
