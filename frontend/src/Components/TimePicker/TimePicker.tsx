import React, { useCallback, useMemo, useContext } from 'react';
import Styled from './TimePicker.styled';
import { useTheme } from '@mui/material';
import { Schedule, User } from 'src/Interface/UserType';
import Size from 'src/Common/Size';
import { Switch } from '@mui/material';
import GlobalStyled from '../GlobalStyled/GlobalStyled.styled';
import { UserContext } from 'src/App';
import { Divider } from '@mui/material';
import DayLabel from 'src/Components/DayLabel';
import NumberEx from 'src/Common/NumberEx';
import { ScheduleService } from 'src/Network/ScheduleService';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const TimePicker: React.FC<{
  selectedUser: User;
  handleToggle: () => void;
  isChecked: boolean;
}> = ({ selectedUser, handleToggle, isChecked }) => {
  const { state, dispatch } = useContext(UserContext);
  // const [size, setSize] = useState<number>(12);
  const size = NumberEx.timeBoxSize;
  const theme = useTheme();
  const location = useLocation();

  const isShowTimePicker = useMemo(() => {
    if (!selectedUser) return false;
    return true;
  }, [selectedUser]);

  const SelectedUserState = useCallback(() => {
    if (!selectedUser) return <GlobalStyled.Circle color="#000000" />;
    if (isChecked) {
      return (
        <GlobalStyled.Circle color={selectedUser.color} size={Size.Medium} />
      );
    } else {
      return (
        <GlobalStyled.Xone color={selectedUser.color} size={Size.Medium} />
      );
    }
  }, [selectedUser, isChecked]);

  const handleDividedTimeBoxTabbed = useCallback(
    async (index: number) => {
      if (!selectedUser) return;
      if (!state.selectedDate) {
        alert('Please Chose Date!');
        return;
      }
      dispatch({
        type: 'ANONY_UPDATETIMETABLE',
        user: selectedUser,
        date: state.selectedDate,
        time: index,
      });
      await ScheduleService.updateSchedules(location.pathname, selectedUser);
    },
    [selectedUser, state.selectedDate]
  );

  const DividedTimeLabel = useCallback(() => {
    return (
      <>
        {Array(size)
          .fill(0)
          .map((_, index) => {
            return (
              <span className="timebox-label" key={index}>
                {index * (24 / size)}
              </span>
            );
          })}
      </>
    );
  }, [size]);

  const DividedTimeSpan = useCallback(() => {
    const check = () => {
      if (!selectedUser || !state.selectedDate) return [];
      const arr = selectedUser.schedules.filter((schedule: Schedule) => {
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
      <>
        {Array(size)
          .fill(0)
          .map((_, index) => {
            const checkArr = check();
            return (
              <span
                className="timebox-span"
                onClick={() => handleDividedTimeBoxTabbed(index)}
                key={index}
              >
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
      </>
    );
  }, [size, selectedUser, state.selectedDate]);

  return (
    <Styled.TimePickerBox
      isShowTimePicker={isShowTimePicker && state.selectedDate !== null}
      bgcolor={theme.myPalette.backgroundModal}
      fgcolor={theme.myPalette.foreground}
      size={size}
    >
      <div className="paddingbox">
        <DayLabel selectedDay={state.selectedDate} />
        <div>
          <span className="subtitle">선택한 사용자</span>
          <Styled.TimePickerHeader className="hflex">
            <div className="user-info hflex">
              <SelectedUserState />
              <span className="user-info-name">
                {selectedUser ? selectedUser.name : 'default'}
              </span>
            </div>
            <Switch
              checked={isChecked}
              onChange={handleToggle}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Styled.TimePickerHeader>
        </div>
        <Divider />
        <span className="subtitle">가능한 시간 선택</span>
        <div className="hflex timebox">
          <DividedTimeLabel />
        </div>
        <div className="hflex timebox">
          <DividedTimeSpan />
        </div>
      </div>
    </Styled.TimePickerBox>
  );
};

export default TimePicker;
