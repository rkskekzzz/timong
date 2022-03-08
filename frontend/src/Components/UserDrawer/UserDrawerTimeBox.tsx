import React, { useContext } from 'react';
import { UserContext } from 'src/App';
import moment from 'moment';
import { Schedule } from 'src/Interface/UserType';
import { UserWithValid } from 'src/Interface/UserType';
import Styled from './UserDrawerTimeBox.styled';
import NumberEx from 'src/Common/NumberEx';
import { useTheme } from '@mui/material';

const UserDrawerTimeBox: React.FC<{ user: UserWithValid }> = ({ user }) => {
  const theme = useTheme();
  const { state } = useContext(UserContext);

  const check = () => {
    if (!state.selectedDate) return [];
    const arr = user.info.schedules.filter((schedule: Schedule) => {
      const _schedule = moment(schedule.start);
      if (_schedule.isSame(state.selectedDate.moment, 'D')) {
        return true;
      }
      return false;
    });
    if (arr[0]) return arr[0].posibleTime;
    else return [];
  };

  return (
    <Styled.UserDrawerTimeBox fgcolor={theme.myPalette.foreground}>
      {Array(NumberEx.timeBoxSize)
        .fill(0)
        .map((_, index) => {
          const checkArr = check();
          return (
            <span className="timebox-span" key={index}>
              <span
                className={
                  checkArr.includes(index)
                    ? 'timebox-span-color filled'
                    : 'timebox-span-color'
                }
              />
            </span>
          );
        })}
    </Styled.UserDrawerTimeBox>
  );
};

export default UserDrawerTimeBox;
