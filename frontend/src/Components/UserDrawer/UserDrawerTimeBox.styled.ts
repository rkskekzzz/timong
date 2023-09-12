import styled from 'styled-components';

const UserDrawerTimeBox = styled.div<{ fgcolor: string }>`
  height: 100%;
  display: flex;
  align-items: center;

  .timebox-span {
    height: 18px;
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 1px;
    .timebox-span-color {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      border: 1px solid ${(props) => `${props.fgcolor + '33' ?? '#ffffff'}`};
      transition: all 0.25s ease-in-out 0ms;
    }
    .filled {
      background: ${(props) => `${props.fgcolor + '33' ?? '#ffffff'}`};
    }
  }
`;

const Styled = { UserDrawerTimeBox };

export default Styled;
