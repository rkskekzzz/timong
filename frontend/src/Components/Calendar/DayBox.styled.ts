import styled from 'styled-components';

const CalendarBox = styled.div`
  height: 100%;
  flex-basis: 200px;
`;
const CalendarDateLabel = styled.div<{
  isThisMonth: boolean;
  dayOfWeek: number;
}>`
  height: 16px;
  width: 100%;
  font-size: 0.8rem;
  padding-left: 3px;
  display: ${(props) => (props.isThisMonth ? '' : 'none')};
  color: ${(props) => {
    switch (props.dayOfWeek) {
      case 0:
        return '#ff3b6d';
      case 6:
        return '#3b6dff';
      default:
        return;
    }
  }};
`;

const CalendarDateCircleBox = styled.div<{ isThisMonth: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 40px;
  padding: 5px 0;
  border-bottom: 1px solid #dadada;
  display: ${(props) => (props.isThisMonth ? '' : 'none')};
`;

const GridWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 40px;
  max-height: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 1px;
  align-items: center;
  justify-content: center;
`;

const Styled = {
  CalendarBox,
  GridWrap,
  CalendarDateLabel,
  CalendarDateCircleBox,
};

export default Styled;
