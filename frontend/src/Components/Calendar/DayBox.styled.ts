import styled from 'styled-components';

const CalendarDateLabel = styled.div<{ isThisMonth: boolean }>`
  width: 100%;
  font-size: 0.8rem;
  padding-left: 3px;
  display: ${(props) => (props.isThisMonth ? '' : 'none')};
`;

const CalendarBox = styled.div`
  flex-basis: 200px;
`;

const CalendarDateCircleBox = styled.div<{ isThisMonth: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border-bottom: 1px solid #dadada;
  display: ${(props) => (props.isThisMonth ? '' : 'none')};
`;

const GridWrap = styled.div`
  margin: 2px auto;
  width: 10vw;
  height: 10vw;
  max-width: 40px;
  max-height: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1px;
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
