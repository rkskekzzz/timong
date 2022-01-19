import React, { useState } from 'react';
import Styled from './Switch.styled';

const Switch = () => {
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleToggle = () => setIsChecked(!isChecked);

  return (
    <Styled.Switch>
      <Styled.SwitchInput
        type="checkbox"
        className={`switch-checkbox`}
        checked={isChecked}
        onChange={handleToggle}
        id={`switch-input`}
      />
      <Styled.SwitchLabel htmlFor={`switch-input`}>
        <Styled.SwitchText>되는 날</Styled.SwitchText>
        <Styled.SwitchText>안되는 날</Styled.SwitchText>
      </Styled.SwitchLabel>
    </Styled.Switch>
  );
};

export default Switch;
