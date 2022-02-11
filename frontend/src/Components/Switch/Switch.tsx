import React from 'react';
import Styled from './Switch.styled';
import { useTheme } from '@mui/material';

const Switch: React.FC<{
  isChecked: boolean;
  isShowSwitch: boolean;
  handleToggle: () => void;
}> = ({ isChecked, isShowSwitch, handleToggle }) => {
  const theme = useTheme();

  return (
    <Styled.Switch
      bgcolor={theme.myPalette.backgroundSwitch}
      isShow={isShowSwitch}
    >
      <Styled.SwitchInput
        type="checkbox"
        className={`switch-checkbox`}
        onChange={handleToggle}
        checked={isChecked}
        id={`switch-input`}
      />
      <Styled.SwitchSelected isChecked={isChecked}></Styled.SwitchSelected>
      <Styled.SwitchLabel htmlFor={`switch-input`}>
        <Styled.SwitchText color={theme.myPalette.foregroundSwitch}>
          O
        </Styled.SwitchText>
        <Styled.SwitchText color={theme.myPalette.foregroundSwitch}>
          X
        </Styled.SwitchText>
      </Styled.SwitchLabel>
    </Styled.Switch>
  );
};

export default Switch;
