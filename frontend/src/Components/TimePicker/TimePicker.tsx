import React, { useCallback, useMemo, useState, useContext } from 'react';
import Styled from './TimePicker.styled';
import { useTheme } from '@mui/material';
import { User } from 'src/Interface/UserType';
import Size from 'src/Common/Size';
import { Switch } from '@mui/material';
import GlobalStyled from '../GlobalStyled/GlobalStyled.styled';
import { UserContext } from 'src/App';

const TimePicker: React.FC<{
  selectedUser: User;
  handleToggle: () => void;
  isChecked: boolean;
}> = ({ selectedUser, handleToggle, isChecked }) => {
  const { state, dispatch } = useContext(UserContext);
  const [size, setSize] = useState<number>(8);
  const theme = useTheme();

  const isShowTimePicker = useMemo(() => {
    if (!selectedUser) return false;
    return true;
  }, [selectedUser]);

  const SelectedUserState = useCallback(() => {
    if (!selectedUser) return <GlobalStyled.Circle color="#000000" />;
    if (isChecked) {
      return <GlobalStyled.Circle color={selectedUser.color} size={Size.Big} />;
    } else {
      return <GlobalStyled.Xone color={selectedUser.color} size={Size.Big} />;
    }
  }, [selectedUser, isChecked]);

  const handleDividedTimeBoxTabbed = (index: number) => {
    console.log('here ', index);
    console.log(selectedUser.schedules);
  };
  //   const getUserTimeTable = () => {};

  const DividedTimeLabel = useCallback(() => {
    return (
      <>
        {Array(size)
          .fill(0)
          .map((_, index) => {
            return (
              <span className="time-label" key={index}>
                {index * (24 / size)}
              </span>
            );
          })}
      </>
    );
  }, [size]);

  const DividedTimeSpan = useCallback(() => {
    return (
      <>
        {Array(size)
          .fill(0)
          .map((_, index) => {
            return (
              <span
                className="timebox-span"
                onClick={() => handleDividedTimeBoxTabbed(index)}
                key={index}
              />
            );
          })}
      </>
    );
  }, [size]);

  return (
    <Styled.TimePickerBox isShowTimePicker={isShowTimePicker} bgcolor="white">
      <div className="paddingbox">
        <h6>{state.selectedDate.moment.format('yyyy M D')}</h6>
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
