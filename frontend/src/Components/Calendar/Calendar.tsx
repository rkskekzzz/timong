import React, { useState, useContext, useRef, useEffect } from 'react';
import Styled from './Calendar.styled';
import MonthBox from './MonthBox';
import { ThemeContext } from '../Timong';
import GlobalStyled from '../Styled/global.styled';
import moment from 'moment';
import { Year } from 'src/Interface/DateType';
import { buildDate } from 'src/Utils';
import { User, Valid } from 'src/Interface/UserType';

// import { AutoSizer, List } from 'react-virtualized';
type UserWithValid = {
  info: User;
  valid: Valid;
};
const initialYear: Year = buildDate(moment());

const Calendar = () => {
  const theme = useContext(ThemeContext);
  const [year, setYear] = useState<Year>(initialYear);

  const touchRef = useRef(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [dayUsers, setDayUsers] = useState<UserWithValid[]>([]);
  const handleDrawerOpen = () => setIsShow(!isShow);
  const handleDrawerClose = () => setIsShow(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (touchRef.current && !touchRef.current.contains(event.target)) {
        if (isShow) setIsShow(false);
      }
    }
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [touchRef]);

  const list = () => {
    return (
      <Styled.UserList ref={touchRef}>
        {dayUsers.map((user) => {
          return (
            <Styled.UserBox key={user.info.color}>
              <GlobalStyled.Circle size="small" color={user.info.color} />
              <div>{user.info.name}</div>
            </Styled.UserBox>
          );
        })}
      </Styled.UserList>
    );
  };

  const drawerHandler = {
    handleDrawerOpen,
    setDayUsers,
    isShow,
  };

  return (
    <>
      <Styled.CalendarPaddingBox color={theme.foreground}>
        {year.map((month) => (
          <MonthBox
            key={month.monthMoment.format('MMMM')}
            month={month}
            drawerHandler={drawerHandler}
          />
        ))}
      </Styled.CalendarPaddingBox>
      <Styled.UserDrawer bgcolor={theme.background} isShow={isShow}>
        {list()}
      </Styled.UserDrawer>
    </>
  );
};

export default React.memo(Calendar);

// const scrollListener = (params) => {
//   if (params.scrollTop + params.clientHeight >= params.scrollHeight - 300) {
//     setYear([
//       ...year,
//       ...buildDate(year[year.length - 1].monthMoment.clone().add(1, 'M')),
//     ]);
//   }
// };
// const rowRanderer = ({ index, style }) => {
//   const month = year[index];
//   return (
//     <div style={style}>
//       <MonthBox key={month.monthMoment.format('MMMM')} month={month} />
//     </div>
//   );
// };
{
  /* <AutoSizer>
      {({ width }) => (
        <List
          rowCount={year.length}
          height={1000}
          rowHeight={600}
          width={width}
          rowRenderer={rowRanderer}
          onScroll={scrollListener}
          overscanRowCount={5}
        />
      )}
    </AutoSizer> */
}
