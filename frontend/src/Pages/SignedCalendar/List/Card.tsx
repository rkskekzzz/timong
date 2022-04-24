import React from 'react';
import { Button, useTheme } from '@mui/material';
import Styled from './Card.styled';
import { Calendar } from 'src/Interface/CalendarType';
import IosShareIcon from '@mui/icons-material/IosShare';

const Card = ({
  group,
  handleCardTabbed,
}: {
  group: Calendar;
  handleCardTabbed: () => void;
}) => {
  const theme = useTheme();
  return (
    <Styled.Card
      fgcolor={theme.myPalette.foreground}
      onClick={handleCardTabbed}
    >
      {group ? (
        <div className="list">
          <p>{group.name}</p>
          <Button onClick={() => alert('here')}>
            <IosShareIcon />
          </Button>
        </div>
      ) : (
        <div className="add">
          <span>+</span>
        </div>
      )}
    </Styled.Card>
  );
};

export default Card;
