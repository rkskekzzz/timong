import React, { useContext } from 'react';
import { Tooltip, Button, useTheme } from '@mui/material';
import Styled from './Card.styled';
import { Calendar } from 'src/Interface/CalendarType';
import { deleteSignedCalendar } from 'src/Hooks/firebaseRelation';
import { fetchCalendarList } from 'src/Hooks/firebaseRelation';
import { UserContext } from 'src/App';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Card = ({
  selected,
  cardIndex,
  group,
  handleCardTabbed,
  color,
}: {
  selected: boolean;
  cardIndex: number;
  group: Calendar;
  handleCardTabbed: () => void;
  color: string;
}) => {
  const theme = useTheme();
  const { state, dispatch } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteAction = async (index: number) => {
    if (confirm('캘린더를 삭제하시겠습니까?')) {
      await deleteSignedCalendar(state, index);
    }
  };
  // const editAction = () => alert('개발중입니다!');
  // const moveAction = () => alert('개발중입니다!');

  const menuItems = [
    {
      name: '삭제하기',
      action: deleteAction,
    },
    // {
    //   name: '수정하기',
    //   action: editAction,
    // },
    // {
    //   name: '순서변경',
    //   action: moveAction,
    // },
  ];

  const action = async (
    itemaction: (cardIndex: number) => Promise<void> | void
  ) => {
    handleClose();
    await itemaction(cardIndex);
    await fetchCalendarList(state, dispatch);
  };

  return (
    <Styled.Card
      selected={selected}
      fgcolor={theme.myPalette.foreground}
      bgcolor={
        color === theme.myPalette.foregroundAddButton
          ? theme.myPalette.backgroundAddButton
          : color
      }
      bordercolor={theme.myPalette.border}
      mode={theme.myPalette.mode}
    >
      {group ? (
        <div className="list">
          <Tooltip title="show calendar" onClick={handleCardTabbed}>
            <Button
              fullWidth
              style={{ justifyContent: 'start', textTransform: 'none' }}
            >
              <p>{group.name}</p>
            </Button>
          </Tooltip>
          <Tooltip title="more">
            <Button onClick={handleClick}>
              <MoreHorizIcon />
            </Button>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="add calendar" onClick={handleCardTabbed}>
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
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action(item.action);
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Styled.Card>
  );
};

export default Card;
