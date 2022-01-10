import styled from 'styled-components';

const CalendarDateLabel = styled.div<{ isThisMonth: boolean }>`
  width: 100%;
  //   color: ${(props) => (props.isThisMonth ? '' : 'black')};
  display: ${(props) => (props.isThisMonth ? '' : 'none')};
`;

const CalendarBox = styled.div`
  flex-basis: 200px;
  padding: 1%;
`;

const CalendarDateCircleBox = styled.div<{ isThisMonth: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  justify-content: flex-start;
  padding: 5px 0;
  border-bottom: 1px solid gray;
  display: ${(props) => (props.isThisMonth ? '' : 'none')};
`;

const GridWrap = styled.div`
  margin: 0 auto;
  width: 10vw;
  height: 10vw;
  max-width: 40px;
  max-height: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3px;
  align-items: center;
  justify-content: center;
  grid-template-rows: repeat(3, 1fr);
`;

export default {
  CalendarBox,
  GridWrap,
  CalendarDateLabel,
  CalendarDateCircleBox,
};
