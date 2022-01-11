import React from 'react';
import DayBox from './DayBox';
import Styled from './MonthBox.styled';
import { Month } from '../../Entities/Date';

const MonthBox: React.FC<{ month: Month }> = ({ month }) => {
  return (
    <div>
      <Styled.CalendarTitle>
        {month.monthMoment.format('MMM')}
      </Styled.CalendarTitle>
      {month.week.map((week, index) => {
        return (
          <Styled.VFlexBox key={month.monthMoment.format('X') + index}>
            <Styled.HFlexBox>
              {week.map((day) => (
                <DayBox key={day.moment.format('X')} day={day} />
              ))}
            </Styled.HFlexBox>
          </Styled.VFlexBox>
        );
      })}
    </div>
  );
};

export default MonthBox;
