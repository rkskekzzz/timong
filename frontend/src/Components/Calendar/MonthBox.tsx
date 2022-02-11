import React, { useContext, useCallback } from 'react';
import DayBox from './DayBox';
import Styled from './MonthBox.styled';
import { Month, Day } from '../../Interface/DateType';
import { globalSelectedUser } from 'src/Interface/UserType';
import { UserContext } from 'src/App';
import { ThemeContext } from '../Timong';
import { ScheduleService } from 'src/Network/ScheduleService';
import { User, Valid } from 'src/Interface/UserType';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);

  const reducedUser = state.users.reduce((user: UserWithValid[], cur: User) => {
    for (const _schedule of cur.schedules) {
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
  const updateUser = async () => {
    dispatch({
      type: 'UPDATEDATE',
      user: globalSelectedUser.user,
      day: day.moment,
      valid: globalSelectedUser.valid ? 'POSIBLE' : 'IMPOSIBLE',
    });
    const result = await ScheduleService.updateSchedules(
      location.pathname,
      globalSelectedUser.user
    );
    console.log(result);
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
        <h6 style={{ color: theme.foreground + '55' }}>
          {month.monthMoment.format('Y')}
        </h6>
        {month.monthMoment.format('M')}
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
