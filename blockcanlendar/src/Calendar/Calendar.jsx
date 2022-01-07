import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const users = [
  { name: 'ycha', color: 'red', avail: [1, 2, 3] },
  { name: 'suhshin', color: 'blue', avail: [2] },
  { name: 'ycha', color: '#aabb33', avail: [1, 2, 3] },
  { name: 'suhshin', color: '#FF0000', avail: [2] },
  { name: 'ycha', color: '#FF0000', avail: [1, 2, 3] },
  { name: 'suhshin', color: '#FF0000', avail: [2] },
];

const color = ['red', 'blue', 'black'];

const Calendar = () => {
  const [getMoment, setMoment] = useState(moment());

  const today = getMoment;
  let i = 0;
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
              let isThisMonth = days.month() !== today.month() ? false : true;
              return (
                <CalendarBox
                  key={index}
                  onClick={() => {
                    handleClick(days);
                  }}
                >
                  <CalendarDateLabel isThisMonth={isThisMonth}>
                    {days.format('D')}
                  </CalendarDateLabel>
                  <CalendarDateCircleBox isThisMonth={isThisMonth}>
                    <Circle size="small" color={color[i++ % 3]} />
                    <Circle size="small" color={color[i++ % 3]} />
                    <Circle size="small" color={color[i++ % 3]} />
                    <Circle size="small" color={color[i++ % 3]} />
                    <Circle size="small" color={color[i++ % 3]} />
                    <Circle size="small" color={color[i++ % 3]} />
                  </CalendarDateCircleBox>
                </CalendarBox>
              );
            })}
        </HFlexBox>
      );
    }
    return result;
  };

  return (
    <>
      <TitleComponent>
        <div>TitleLabel</div>
      </TitleComponent>
      <MainComponent>
        <BottomShadowBox>
          <HScrollBox>
            {users.map((e) => {
              return (
                <HFlexUserBox>
                  <Circle color={e.color} />
                  <UserNameLabel>{e.name}</UserNameLabel>
                </HFlexUserBox>
              );
            })}
          </HScrollBox>
        </BottomShadowBox>
        <CalendarPaddingBox>
          <VFlexBox>{calendarArr()}</VFlexBox>
          <VFlexBox>{calendarArr()}</VFlexBox>
        </CalendarPaddingBox>
      </MainComponent>
    </>
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
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const BottomShadowBox = styled.div`
  background: white;
  box-shadow: 0px 3px 2px 1px #dadada;
  position: sticky;
  top: 0;
`;

const TitleComponent = styled.div`
  background-color: #679fff;
  height: 55px;
  display: flex;
`;

const CalendarPaddingBox = styled.div`
  padding: 0 20px;
`;

const HScrollBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow: scroll;
  padding: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  // background: #25a5b3;
`;

const VFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
`;

const HFlexUserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 2px 5px;
  border-radius: 12px;
  background: #f0f0f0;
`;

const CalendarBox = styled.div`
  flex-basis: 200px;

  padding: 1%;
`;

const CalendarDateLabel = styled.div`
  width: 20px;

  ${({ isThisMonth }) => {
    if (!isThisMonth) {
      return `color: white;`;
    }
  }};
`;

const Circle = styled.div`
  border-radius: 50%;

  ${({ size }) => {
    if (size === 'small') {
      return `width: 9px;
        height: 9px;`;
    } else {
      return `width: 11px;
      height: 11px`;
    }
  }};

  ${({ color }) => {
    return `background: ${color}`;
  }};
`;

const UserNameLabel = styled.span`
  font-size: 1.2rem;
`;

const CalendarDateCircleBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  justify-content: flex-start;
  padding: 5px 0;
  border-bottom: 1px solid gray;
  ${({ isThisMonth }) => {
    if (!isThisMonth) {
      return `display: none`;
    }
  }};
`;
