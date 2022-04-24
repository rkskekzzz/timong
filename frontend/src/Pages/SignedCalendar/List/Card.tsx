import React from 'react';
import { useTheme } from '@mui/material';
import Styled from './Card.styled';
import { Calendar } from 'src/Interface/CalendarType';

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
        <>
          <p>{group.name}</p>
          {/* <h2>{group.group_name}</h2> */}
          {/* <p>{group.group_users}</p> */}
        </>
      ) : (
        <div>
          <span className="add">+</span>
        </div>
      )}
    </Styled.Card>
  );
};

export default Card;
