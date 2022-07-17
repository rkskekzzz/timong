import React, { useState, useRef, useEffect, useContext } from 'react';
import MonthBox from './MonthBox';
import moment from 'moment';
import { Year, Day } from 'src/Interface/DateType';
import { UserWithValid } from 'src/Interface/UserType';
import { buildDate } from 'src/Utils';
import { Box } from '@mui/material';
import Styled from './Monthly.styled';
import UserDrawer from 'src/Components/UserDrawer/UserDrawer';
import EditButton from 'src/Pages/SignedCalendar/List/EditButton';
import Users from 'src/Components/Users';
import { useLocation } from 'react-router-dom';
import { UserContext } from 'src/App';
import TimePicker from 'src/Components/TimePicker';

const initialYear: Year = buildDate(moment());

const Monthly: React.FC<{
  selectedIndex: number;
  isUserCreated: number;
}> = ({ selectedIndex, isUserCreated }) => {
  const location = useLocation();
  const touchRef = useRef(null);
  const userDrawerRef = useRef(null);
  const timePickerRef = useRef(null);
  const [year, setYear] = useState<Year>(initialYear);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [dayUsers, setDayUsers] = useState<UserWithValid[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const { state, dispatch } = useContext(UserContext);

  const obsRef = useRef(null);
  const preventRef = useRef(true);

  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setYear((year) => [
        ...year,
        ...buildDate(year[year.length - 1].monthMoment.clone().add(1, 'M')),
      ]);
      preventRef.current = true;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleDrawerOpen = () => setIsShow(!isShow);
  const handleDrawerClose = () => setIsShow(false);

  const drawerHandler = {
    handleDrawerOpen,
    setDayUsers,
    isShow,
    setSelectedDay,
  };

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

  useEffect(() => {
    setIsShowEdit(state.selectedUser !== null);
  }, [state.selectedUser]);

  useEffect(() => {
    dispatch({ type: 'SETSELECTEDUSER', user: null });
    setIsShow(false);
    setIsShowEdit(false);
  }, [selectedIndex]);

  return (
    <Box
      position="relative"
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Styled.AutoSizerWrapper>
        <div
          className="calendar-box"
          style={{ height: window.innerHeight - 60 }}
        >
          {year.map((month, index) => {
            return (
              <div
                key={index}
                style={{ height: 60 + year[index].week.length * 80 + 30 }}
              >
                <MonthBox
                  month={month}
                  drawerHandler={drawerHandler}
                  selectedIndex={selectedIndex}
                />
              </div>
            );
          })}
          <div id="observer" ref={obsRef}>
            옵저버
          </div>
        </div>
        {location.pathname.includes('calendar') ? (
          <EditButton
            userDrawerRef={userDrawerRef}
            timePickerRef={timePickerRef}
            isUserCreated={isUserCreated}
            isShowEdit={isShowEdit}
            isShow={isShow}
            selectedIndex={selectedIndex}
            handleDrawerClose={handleDrawerClose}
          />
        ) : (
          <Users />
        )}
        <TimePicker
          timePickerRef={timePickerRef}
          isShowEdit={isShowEdit}
          selectedUser={state.selectedUser}
          selectedIndex={selectedIndex}
        />
        <UserDrawer
          userDrawerRef={userDrawerRef}
          isShow={isShow}
          touchRef={touchRef}
          selectedDay={selectedDay}
          dayUsers={dayUsers}
          handleDrawerClose={handleDrawerClose}
        />
      </Styled.AutoSizerWrapper>
    </Box>
  );
};

export default Monthly;
