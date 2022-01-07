import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Calendar = () => {
  const [getMoment, setMoment] = useState(moment());

  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week();

  const handleClick = (days) => {
    console.log(today);
    console.log(`오늘은 ? ${days._d}`);
  };

  const calendarArr = () => {
    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <HFlexBox key={week}>
          {Array(7)
            .fill(0)
            // eslint-disable-next-line no-loop-func
            .map((data, index) => {
              let days = today
                .clone()
                .startOf('year')
                .week(week)
                .startOf('week')
                .add(index, 'day'); //d로해도되지만 직관성

              return (
                <CalendarBox
                  key={index}
                  onClick={() => {
                    handleClick(days);
                  }}
                >
                  <CalendarDateLabel>{days.format('D')}</CalendarDateLabel>
                </CalendarBox>
              );
            })}
        </HFlexBox>
      );
    }
    return result;
  };

  return (
    <MainComponent>
      <HScrollBox>
        <div>a</div>
      </HScrollBox>
      <VFlexBox>{calendarArr()}</VFlexBox>
    </MainComponent>
  );
};
export default Calendar;

// <div className="control">
// <button
//           onClick={() => {
//             setMoment(getMoment.clone().subtract(1, 'month'));
//           }}
//         >
//           이전달
//         </button>
//         <span>{today.format('YYYY 년 MM 월')}</span>
//         <button
//           onClick={() => {
//             setMoment(getMoment.clone().add(1, 'month'));
//           }}
//         >
//           다음달
//         </button>
//       </div>

const MainComponent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10%;
`;

const HScrollBox = styled.div`
  overflow: scroll;
`;

const VFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HFlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CalendarBox = styled.div`
  border: 1px solid blue;
`;

const CalendarDateLabel = styled.div`
  width: 20px;
`;
