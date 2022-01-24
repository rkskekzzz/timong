import React, { useContext, useCallback } from 'react';
import DayBox from './DayBox';
import Styled from './MonthBox.styled';
import { Month, Day } from '../../Interface/DateType';
import { globalSelectedUser } from 'src/Interface/UserType';
import { UserContext } from 'src/App';
import { ThemeContext } from '../Timong';
import { User, Valid } from 'src/Interface/UserType';

type UserWithValid = {
  info: User;
  valid: Valid;
};
type DrawerHandler = {
  handleDrawerOpen: () => void;
  setDayUsers: (users: UserWithValid[]) => void;
  isShow: boolean;
  setSelectedDay: (selectedDay: Day) => void;
};

function DayBoxLogic({
  day,
  month,
  drawerHandler,
}: {
  day: Day;
  month: Month;
  drawerHandler: DrawerHandler;
}) {
  const { state, dispatch } = useContext(UserContext);

  const reducedUser = state.users.reduce((user: UserWithValid[], cur: User) => {
    for (const _schedule of cur.schedule) {
      if (day.moment.isSame(_schedule.start, 'day')) {
        user.push({
          info: cur,
          valid: _schedule.valid,
        });
      }
    }
    return user;
  }, []);
  const showUsers = () => {
    drawerHandler.setSelectedDay(day);
    drawerHandler.handleDrawerOpen();
    drawerHandler.setDayUsers(reducedUser);
  };
  const updateUser = () => {
    dispatch({
      type: 'UPDATEDATE',
      user: globalSelectedUser.user,
      day: day.moment,
      valid: globalSelectedUser.valid ? 'POSIBLE' : 'IMPOSIBLE',
    });
  };
  const handleClick = useCallback(() => {
    if (!globalSelectedUser.user) showUsers();
    else updateUser();
  }, [updateUser, day, showUsers]);
  const isThisMonth = month.monthMoment.isSame(day.moment, 'month');

  return (
    <DayBox
      key={day.moment.format('X')}
      day={day}
      users={reducedUser}
      handleClick={handleClick}
      isThisMonth={isThisMonth}
    />
  );
}

const MonthBox: React.FC<{ month: Month; drawerHandler: DrawerHandler }> = ({
  month,
  drawerHandler,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <Styled.MonthBox color={theme.foreground}>
      <Styled.CalendarTitle>
        {month.monthMoment.format('M') + '월'}
      </Styled.CalendarTitle>
      {month.week.map((week, index) => {
        return (
          <Styled.VFlexBox key={month.monthMoment.format('X') + index}>
            <Styled.HFlexBox>
              {week.map((day) => {
                return (
                  <DayBoxLogic
                    key={day.moment.format('X')}
                    day={day}
                    month={month}
                    drawerHandler={drawerHandler}
                  />
                );
              })}
            </Styled.HFlexBox>
          </Styled.VFlexBox>
        );
      })}
    </Styled.MonthBox>
  );
};

export default React.memo(MonthBox);
