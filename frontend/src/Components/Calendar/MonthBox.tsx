import React, { useContext, useCallback } from 'react';
import DayBox from './DayBox';
import Styled from './MonthBox.styled';
import { Month, Day } from '../../Entities/Date';
import { globalSelectedUser } from 'src/Entities/User';
import { UserContext } from 'src/App';

function DayBoxLogic({ day }: { day: Day }) {
  const { state, dispatch } = useContext(UserContext);

  const filteredUser = state.users.filter((user) => {
    for (const _day of user.avail) {
      if (day.moment.isSame(_day, 'day')) {
        return true;
      }
    }
    return false;
  });
  const handleClick = useCallback(() => {
    if (!globalSelectedUser.user) return;
    dispatch({
      type: 'UPDATEDATE',
      user: globalSelectedUser.user,
      day: day.moment,
    });
  }, [day]);

  return (
    <DayBox
      key={day.moment.format('X')}
      day={day}
      users={filteredUser}
      handleClick={handleClick}
    />
  );
}

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
              {week.map((day) => {
                return <DayBoxLogic key={day.moment.format('X')} day={day} />;
              })}
            </Styled.HFlexBox>
          </Styled.VFlexBox>
        );
      })}
    </div>
  );
};

export default React.memo(MonthBox);
