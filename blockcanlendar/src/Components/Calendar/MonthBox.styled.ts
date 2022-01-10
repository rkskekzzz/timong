import styled from 'styled-components';

const HFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
`;

const VFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dfdfdf;
  padding: 10px;
  gap: 10px;
`;

const CalendarTitle = styled.span`
  text-align: center;
`;

export default { VFlexBox, HFlexBox, CalendarTitle };
