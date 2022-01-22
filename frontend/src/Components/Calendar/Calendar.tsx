import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import Styled from './Calendar.styled';
import MonthBox from './MonthBox';
import { ThemeContext } from '../Timong';
import GlobalStyled from '../Styled/global.styled';
import moment from 'moment';
import { Year, Day } from 'src/Interface/DateType';
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
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

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

  const dayLabel = useCallback(() => {
    if (!selectedDay) return 'null';
    return (
      selectedDay.moment.format('Y') +
      '년 ' +
      selectedDay.moment.format('M') +
      '월 ' +
      selectedDay.moment.format('D') +
      '일 '
    );
  }, [selectedDay]);
  const list = () => {
    return (
      <Styled.UserList ref={touchRef}>
        <Styled.DayLabel>{dayLabel()}</Styled.DayLabel>
        <div>
          {dayUsers.map((user) => {
            if (user.valid == 'POSIBLE') {
              return (
                <Styled.UserBox>
                  <GlobalStyled.Circle size="small" color={user.info.color} />
                  <div>{user.info.name}</div>
                </Styled.UserBox>
              );
            } else {
              return (
                <Styled.UserBox>
                  <GlobalStyled.Xone size="small" color={user.info.color} />
                  <div>{user.info.name}</div>
                </Styled.UserBox>
              );
            }
          })}
        </div>
      </Styled.UserList>
    );
  };

  const drawerHandler = {
    handleDrawerOpen,
    setDayUsers,
    isShow,
    setSelectedDay,
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
      <Styled.UserDrawer
        anchor="bottom"
        open={isShow}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        swipeAreaWidth={0}
        disableSwipeToOpen={false}
        bgcolor={theme.backDrop}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Styled.Puller />
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
