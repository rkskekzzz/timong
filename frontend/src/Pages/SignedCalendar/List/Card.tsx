import React, { useState } from 'react';
import { Tooltip, Button, useTheme, Snackbar, Alert } from '@mui/material';
import Styled from './Card.styled';
import { Calendar } from 'src/Interface/CalendarType';
import IosShareIcon from '@mui/icons-material/IosShare';

const Card = ({
  group,
  handleCardTabbed,
  selected,
}: {
  group: Calendar;
  handleCardTabbed: () => void;
  selected: boolean;
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Styled.Card
      selected={selected}
      fgcolor={theme.myPalette.foreground}
      onClick={handleCardTabbed}
    >
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          <p style={{ width: '300px' }}>Copy To Clipboard!</p>
        </Alert>
      </Snackbar>
      {group ? (
        <div className="list">
          <Tooltip title="show calendar">
            <Button fullWidth style={{ justifyContent: 'start' }}>
              <p>{group.name}</p>
            </Button>
          </Tooltip>
          <Tooltip title="share">
            <Button onClick={handleOpen}>
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
