import React, { useState, useRef, useEffect, useContext } from 'react';
import MonthBox from './MonthBox';
import moment from 'moment';
import { Year, Day } from 'src/Interface/DateType';
import { UserWithValid } from 'src/Interface/UserType';
import { buildDate } from 'src/Utils';
import { Box } from '@mui/material';
import Styled from './Monthly.styled';
import { AutoSizer, List } from 'react-virtualized';
import UserDrawer from 'src/Components/UserDrawer/UserDrawer';
import NumberEx from 'src/Common/NumberEx';
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

  const handleDrawerOpen = () => setIsShow(!isShow);
  const handleDrawerClose = () => setIsShow(false);

  const drawerHandler = {
    handleDrawerOpen,
    setDayUsers,
    isShow,
    setSelectedDay,
  };

  const scrollListener = (params) => {
    if (params.scrollTop + params.clientHeight >= params.scrollHeight - 100) {
      setYear((year) => [
        ...year,
        ...buildDate(year[year.length - 1].monthMoment.clone().add(1, 'M')),
      ]);
    }
  };

  const rowRenderer = ({ index, key, style }) => {
    const month = year[index];
    return (
      <div style={style} key={key}>
        <MonthBox
          month={month}
          drawerHandler={drawerHandler}
          selectedIndex={selectedIndex}
        />
      </div>
    );
  };

  const getRowHeight = ({ index }: { index: number }) => {
    return 60 + year[index].week.length * 80 + 30;
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

  /**
   * react-vertualized (https://bvaughn.github.io/react-virtualized/#/components/AutoSizer)
   *
   * WindowScroller props 의미
   * @param width : 너비
   * @param height: 높이
   * ㄴ 그려줄 data grid의 전체 사이즈라고 생각하면 편하다
   * @param isScrolling : 스크롤을 감지하는 상태값이다.
   * @param scrollTop : scrollTop을 바꿀 수 있는 변수 해당 값을 바꾸면 원하는 위치로 이동할 수 있다.
   * @param registerChild : registerChild를 활용해서 windowscroller의 자식 컴포넌트로 ref를 전달할 수 있다.
   * ref를 사용하지 않으면 windowscroller가 findDOMNode()를 호출하는데 이는 strict mode에서는 권장하지 않는 방식이기 때문에 ref를 사용하는 것이 적합하다.
   * 문제인지
   * @see https://github.com/bvaughn/react-virtualized/issues/1572
   * 해결책
   * @see https://github.com/bvaughn/react-virtualized/blob/master/docs/WindowScroller.md#render-props
   */
  return (
    <Box position="relative">
      <Styled.AutoSizerWrapper>
        <AutoSizer>
          {({ height, width }) => (
            <>
              <List
                className="list"
                height={height}
                rowHeight={getRowHeight}
                onScroll={scrollListener}
                rowCount={year.length}
                rowRenderer={rowRenderer}
                width={width}
                style={{
                  maxWidth: NumberEx.calendarMaxWidth,
                }} // 리스트 내부 너비의 최대값을 지정함 (grid를 정사각형으로 유도)
              />
              <div className="movebox" style={{ width: width }}>
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
                />
                <UserDrawer
                  userDrawerRef={userDrawerRef}
                  isShow={isShow}
                  touchRef={touchRef}
                  selectedDay={selectedDay}
                  dayUsers={dayUsers}
                  handleDrawerClose={handleDrawerClose}
                />
              </div>
            </>
          )}
        </AutoSizer>
      </Styled.AutoSizerWrapper>
    </Box>
  );
};

export default Monthly;
