import React, { useContext, useCallback, useMemo } from 'react';
import DayBox from './DayBox';
import Styled from './MonthBox.styled';
import { Month, Day } from 'src/Interface/DateType';
import { UserContext } from 'src/App';
import { useTheme } from '@mui/material';
import { ScheduleService } from 'src/Network/ScheduleService';
import { User, Valid } from 'src/Interface/UserType';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

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
  selectedIndex,
}: {
  day: Day;
  month: Month;
  drawerHandler: DrawerHandler;
  selectedIndex: number;
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
    dispatch({ type: 'SETSELECTEDDATE', day: day.moment });
  };
  const updateUser = async () => {
    dispatch({
      type: 'ANONY_UPDATEDATE',
      user: state.selectedUser,
      day: day.moment,
      valid: state.selectedValid,
    });
    dispatch({ type: 'SETSELECTEDDATE', day: day.moment });

    if (state.isSigned) {
      await ScheduleService.updateSchedules(
        '/' + state.calendarList[selectedIndex]._id,
        state.selectedUser
      );
    } else {
      await ScheduleService.updateSchedules(
        location.pathname,
        state.selectedUser
      );
    }
  };
  const handleClick = useCallback(() => {
    if (!state.selectedUser) showUsers();
    else updateUser();
  }, [day, showUsers]);
  const isThisMonth = month.monthMoment.isSame(day.moment, 'month');
  const isToday = day.moment.isSame(moment(), 'day');
  const gridSize = useMemo(() => {
    return Math.max(Math.floor(Math.sqrt(state.users.length)), 4);
  }, [state.users]);
  return (
    <DayBox
      key={day.moment.format('X')}
      day={day}
      users={reducedUser}
      handleClick={handleClick}
      isThisMonth={isThisMonth}
      isToday={isToday}
      gridSize={gridSize}
    />
  );
}

const MonthBox: React.FC<{
  month: Month;
  drawerHandler: DrawerHandler;
  selectedIndex: number;
}> = ({ month, drawerHandler, selectedIndex }) => {
  const theme = useTheme();
  return (
    <Styled.MonthBox color={theme.myPalette.foreground}>
      <Styled.CalendarTitle>
        <h6 style={{ color: theme.myPalette.foreground + '55' }}>
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
                    selectedIndex={selectedIndex}
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

export default MonthBox;
