import React, { useContext } from 'react';
import Styled from './Switch.styled';
import { ThemeContext } from '../Timong';

const Switch: React.FC<{
  isChecked: boolean;
  handleToggle: () => void;
}> = ({ isChecked, handleToggle }) => {
  const theme = useContext(ThemeContext);

  return (
    <Styled.Switch bgcolor={theme.backgroundSwitch}>
      <Styled.SwitchInput
        type="checkbox"
        className={`switch-checkbox`}
        onChange={handleToggle}
        checked={isChecked}
        id={`switch-input`}
      />
      <Styled.SwitchSelected isChecked={isChecked}></Styled.SwitchSelected>
      <Styled.SwitchLabel htmlFor={`switch-input`}>
        <Styled.SwitchText color={theme.foregroundSwitch}>O</Styled.SwitchText>
        <Styled.SwitchText color={theme.foregroundSwitch}>X</Styled.SwitchText>
      </Styled.SwitchLabel>
    </Styled.Switch>
  );
};

export default Switch;
