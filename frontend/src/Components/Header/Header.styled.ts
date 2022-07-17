import styled from 'styled-components';

const Header = styled.div<{ bgcolor: string; fgcolor: string | null }>`
  position: fixed;
  top: 0;
  z-index: 1;
  height: 60px;
  width: 100%;
  display: flex;

  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  box-shadow: rgb(0 0 0 / 16%) 0px 1px 10px 0px;
  background: ${(props) => props.bgcolor || '#f2f2f2'};

  div:first-child {
    cursor: pointer;
  }
  .logo-box {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 30px;
    }
    h3 {
      font-size: 1.2rem;
      font-weight: bold;
      color: ${(props) => (props.fgcolor ? props.fgcolor : '#ff6ff2')};
    }
  }
`;

const HeaderFlexDiv = styled.div`
  position: relative;
  display: flex;
  padding: 10px 20px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const HeaderCalendarTitle = styled.div<{ color: string }>`
  font-size: 0.7rem;
  font-weight: bold;
  position: relative;

  color: ${(props) => props.color || '#6a6a6a'};
`;

const Styled = {
  Header,
  HeaderFlexDiv,
  HeaderCalendarTitle,
};

export default Styled;
