import styled from 'styled-components';

const Header = styled.div<{ bgcolor: string }>`
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
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 30px;
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

const HeaderAnonyCalendarTitle = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6ff2;
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
  HeaderAnonyCalendarTitle,
};

export default Styled;
