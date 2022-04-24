import React, { useState, useContext, useEffect } from 'react';
import Styled from './List.styled';
import { dbService } from 'src/firebase';
import { UserContext } from 'src/App';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { CalendarService } from 'src/Network/CalendarService';
import { UserService } from 'src/Network/UserService';
import { Calendar } from 'src/Interface/CalendarType';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

//import는 필수이다.

const List = () => {
  const [calendarList, setCalendarList] = useState<Calendar[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { state, dispatch } = useContext(UserContext);
  const navi = useNavigate();

  const fetchData = async () => {
    /**
     * fetch calendar list with firebase (by user_id)
     *
     * if user already exist, fetch the list
     * else, make new Document in User Collection with user_id
     *
     * user_id is made by firebase auth.
     * you can get this id with getAuth() method
     */
    const docRef = doc(dbService, 'TestUsers', state.isSigned);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        user_name: 'default',
        user_color: '#0000ff',
        user_id: state.isSigned,
        user_schedules: [],
        user_calendar_list: [],
      });
    } else {
      const { user_calendar_list } = docSnap.data();
      setCalendarList(user_calendar_list);
    }
  };

  const addCalendar = async () => {
    const docRef = doc(dbService, 'TestUsers', state.isSigned);
    const calendar = await CalendarService.create('default');
    const user = await getDoc(docRef);
    if (!calendar || !user) alert('fail to fetch data..!!');

    const createResult = UserService.createUser('/' + calendar._id, {
      name: user.data().user_name,
      color: user.data().user_color,
    });
    const createCalendarRelation = setDoc(docRef, {
      ...user.data(),
      user_calendar_list: [
        ...user.data().user_calendar_list,
        {
          _id: calendar._id,
          name: 'default',
        },
      ],
    });
    Promise.all([createResult, createCalendarRelation]).then(fetchData);
  };
  const handleCardTabbed = (index: number) => {
    setSelectedIndex(index);
    navi('/calendar/?id=' + calendarList[selectedIndex]._id);
  };

  useEffect(() => {
    if (state.isSigned) fetchData();
  }, [state.isSigned]);

  useEffect(() => {
    if (calendarList.length == 0) return;
    const getCalendar = async () => {
      const result = await CalendarService.getCalendar(
        '/' + calendarList[selectedIndex]._id
      );
      if (!result) console.log('no result');
      dispatch({
        type: 'INIT',
        users: result.users,
        meetingDays: result.meetingDays,
      });
    };
    getCalendar();
  }, [calendarList, selectedIndex]);

  return (
    <Styled.List>
      {calendarList.map((element, index) => {
        return (
          <Card
            key={element._id + index}
            group={element}
            handleCardTabbed={() => handleCardTabbed(index)}
          />
        );
      })}
      <Card group={null} handleCardTabbed={addCalendar} />
    </Styled.List>
  );
};

export default List;
