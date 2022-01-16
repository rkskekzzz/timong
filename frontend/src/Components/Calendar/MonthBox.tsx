import React, { useContext } from 'react';
import DayBox from './DayBox';
import Styled from './MonthBox.styled';
import { Month } from '../../Entities/Date';
import { UserContext } from '../Timong';
import { userInfo } from 'os';
import moment from 'moment';

const MonthBox: React.FC<{ month: Month }> = ({ month }) => {
  const { state } = useContext(UserContext);

  return (
    <div>
      <Styled.CalendarTitle>
        {month.monthMoment.format('MMM')}
      </Styled.CalendarTitle>
      {month.week.map((week, index) => {
        return (
          <Styled.VFlexBox key={month.monthMoment.format('X') + index}>
            <Styled.HFlexBox>
              {week.map((day) => {
                const filteredUser = state.users.filter((user) => {
                  for (const _day of user.avail) {
                    if (day.moment.isSame(_day, 'day')) {
                      return true;
                    }
                  }
                  return false;
                });
                console.log(day.moment.format('MMDD'), filteredUser);

                return (
                  <DayBox
                    key={day.moment.format('X')}
                    day={day}
                    users={filteredUser}
                  />
                );
              })}
            </Styled.HFlexBox>
          </Styled.VFlexBox>
        );
      })}
    </div>
  );
};

export default React.memo(MonthBox);
