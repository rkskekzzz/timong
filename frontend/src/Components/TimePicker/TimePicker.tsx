import React, { useMemo, useState } from 'react';
import Styled from './TimePicker.styled';
import { useTheme } from '@mui/material';
import { User } from 'src/Interface/UserType';
import Size from 'src/Common/Size';
import { Switch } from '@mui/material';
import GlobalStyled from '../GlobalStyled/GlobalStyled.styled';

const TimePicker: React.FC<{
  selectedUser: User;
  handleToggle: () => void;
  isChecked: boolean;
}> = ({ selectedUser, handleToggle, isChecked }) => {
  const theme = useTheme();

  const isShowTimePicker = useMemo(() => {
    if (!selectedUser) return false;
    return true;
  }, [selectedUser]);

  const SelectedUserState = () => {
    if (!selectedUser) return <GlobalStyled.Circle color="#000000" />;
    if (isChecked) {
      return <GlobalStyled.Circle color={selectedUser.color} size={Size.Big} />;
    } else {
      return <GlobalStyled.Xone color={selectedUser.color} size={Size.Big} />;
    }
  };

  return (
    <Styled.TimePickerBox isShowTimePicker={isShowTimePicker} bgcolor="white">
      <div className="paddingbox">
        <div className="hflex timepicker-header">
          <div className="hflex user-info">
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
        </div>
        <div className="hflex timebox">
          <span>0</span>
          <span>6</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
        <div className="hflex timebox">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </Styled.TimePickerBox>
  );
};

export default TimePicker;
