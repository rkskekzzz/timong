import React from 'react';
import { Tooltip, Button, useTheme } from '@mui/material';
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
          <Tooltip title="show calendar">
            <Button fullWidth style={{ justifyContent: 'start' }}>
              <p>{group.name}</p>
            </Button>
          </Tooltip>
          <Tooltip title="share">
            <Button onClick={() => alert('here')}>
              <IosShareIcon />
            </Button>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="add calendar">
          <Button className="add">
            <span>+</span>
          </Button>
        </Tooltip>
      )}
    </Styled.Card>
  );
};

export default Card;
