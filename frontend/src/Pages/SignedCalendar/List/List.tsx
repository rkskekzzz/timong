import React, { useState, useContext, useEffect } from 'react';
import Styled from './List.styled';
import { useTheme } from '@mui/material';
import { dbService } from 'src/firebase';
import { UserContext } from 'src/App';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { CalendarService } from 'src/Network/CalendarService';
import { UserService } from 'src/Network/UserService';
import { User } from 'src/Interface/UserType';

//import는 필수이다.

const Card = ({
  group,
  handleCardTabbed,
}: {
  group: string;
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
          <p>{group}</p>
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

const List = () => {
  const navi = useNavigate();
  const [list, setList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { state, dispatch } = useContext(UserContext);

  const fetchData = async () => {
    const docRef = doc(dbService, 'TestUsers', state.isSigned);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        user_name: 'default',
        user_color: '#0000ff',
        user_id: state.isSigned,
        user_schedules: [],
        user_calendar_list: [],
        user_calendar_name: [],
      });
    } else {
      const { user_calendar_list } = docSnap.data();
      setList(user_calendar_list);
    }
  };

  const addCalendar = () => {
    CalendarService.create('default')
      .then((result) => {
        const docRef = doc(dbService, 'TestUsers', state.isSigned);

        console.log(result);

        getDoc(docRef)
          .then((snap) => {
            UserService.createUser('/' + result._id, {
              name: snap.data().user_name,
              color: snap.data().user_color,
            });
            setDoc(docRef, {
              ...snap.data(),
              user_calendar_list: [
                ...snap.data().user_calendar_list,
                result._id,
              ],
              user_calendar_name: [
                ...snap.data().user_calendar_name,
                result.name,
              ],
            });
          })
          .then(() => {
            fetchData();
          });
      })
      .catch((error) => {
        alert('fail to create calendar..!! with' + error);
      });
  };
  const handleCardTabbed = (index: number) => {
    setSelectedIndex(index);
    console.log(state.users);
  };

  useEffect(() => {
    /**
     * fetch calendar list with firebase (by user_id)
     *
     * if user already exist, fetch the list
     * else, make new Document in User Collection with user_id
     *
     * user_id is made by firebase auth.
     * you can get this id with getAuth() method
     */
    if (state.isSigned) fetchData();
  }, [state.isSigned]);

  useEffect(() => {
    if (list.length == 0) return;
    const getCalendar = async () => {
      const result = await CalendarService.getCalendar(
        '/' + list[selectedIndex]
      );
      console.log(result);
      if (result) {
        dispatch({
          type: 'INIT',
          users: result.users,
          meetingDays: result.meetingDays,
        });
      } else {
        navi('/404');
      }
    };
    console.log('get index : ', selectedIndex);
    getCalendar();
  }, [list, selectedIndex]);

  return (
    <Styled.List>
      <div className="list-box">
        {list.map((element, index) => {
          return (
            <Card
              key={element + index}
              group={element}
              handleCardTabbed={() => handleCardTabbed(index)}
            />
          );
        })}
        <Card group={null} handleCardTabbed={addCalendar} />
      </div>
    </Styled.List>
  );
};

export default List;
