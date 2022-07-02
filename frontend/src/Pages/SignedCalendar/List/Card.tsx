import React, { useState } from 'react';
import { Tooltip, Button, useTheme } from '@mui/material';
import Styled from './Card.styled';
import { Calendar } from 'src/Interface/CalendarType';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Styled.Card
      selected={selected}
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
            <Button onClick={handleClick}>
              <MoreHorizIcon />
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Styled.Card>
  );
};

export default Card;
