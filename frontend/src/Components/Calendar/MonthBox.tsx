import React, { useContext, useCallback } from 'react';
import DayBox from './DayBox';
import Styled from './MonthBox.styled';
import { Month, Day } from '../../Interface/DateType';
import { globalSelectedUser } from 'src/Interface/UserType';
import { UserContext } from 'src/App';
import { User, Valid } from 'src/Interface/UserType';

function DayBoxLogic({ day }: { day: Day }) {
  const { state, dispatch } = useContext(UserContext);

  const reducedUser = state.users.reduce(
    (user: { info: User; valid: Valid }[], cur: User) => {
      for (const _schedule of cur.schedule) {
        if (day.moment.isSame(_schedule.start, 'day')) {
          user.push({
            info: cur,
            valid: _schedule.valid,
          });
        }
      }
      return user;
    },
    []
  );

  const handleClick = useCallback(() => {
    if (!globalSelectedUser.user) return;
    dispatch({
      type: 'UPDATEDATE',
      user: globalSelectedUser.user,
      day: day.moment,
      valid: globalSelectedUser.valid ? 'POSIBLE' : 'IMPOSIBLE',
    });
  }, [day]);

  return (
    <DayBox
      key={day.moment.format('X')}
      day={day}
      users={reducedUser}
      handleClick={handleClick}
    />
  );
}

const MonthBox: React.FC<{ month: Month }> = ({ month }) => {
  return (
    <div>
      <Styled.CalendarTitle>
        {month.monthMoment.format('M') + '월'}
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
