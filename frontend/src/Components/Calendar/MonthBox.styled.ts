import styled from 'styled-components';

const HFlexBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  gap: 1%;
`;

const VFlexBox = styled.div`
  height: 60px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

const CalendarTitle = styled.span`
  font-size: 1.18rem;
  font-weight: bold;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Styled = { VFlexBox, HFlexBox, CalendarTitle };

export default Styled;
