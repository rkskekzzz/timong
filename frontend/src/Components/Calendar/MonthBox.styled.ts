import styled from 'styled-components';

const HFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  gap: 1%;
`;

const VFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

const CalendarTitle = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
`;

const Styled = { VFlexBox, HFlexBox, CalendarTitle };

export default Styled;
