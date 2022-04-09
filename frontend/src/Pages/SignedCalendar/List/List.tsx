import React, { useState, useContext, useEffect } from 'react';
import Styled from './List.styled';
import { Group } from 'src/Interface/Group';
import { useTheme } from '@mui/material';
import { dbService } from 'src/firebase';
import { UserContext } from 'src/App';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { auth } from 'src/firebase';
//import는 필수이다.

const arr: Group[] = [
  { group_name: 'hi', group_users: 3, group_id: '1' },
  { group_name: 'asdf', group_users: 1, group_id: '2' },
  { group_name: 'qwer', group_users: 2, group_id: '3' },
];

const selectedStyle = {
  background: 'red',
};

const Card = ({ group }: { group: Group }) => {
  const theme = useTheme();
  return (
    <Styled.Card fgcolor={theme.myPalette.foreground}>
      {group ? (
        <>
          <h2>{group.group_name}</h2>
          <p>{group.group_users}</p>
        </>
      ) : (
        <>
          <p>추가해주세요</p>
        </>
      )}
    </Styled.Card>
  );
};

const List = () => {
  const [list, setList] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) dispatch({ type: 'SIGNIN', uid: user.uid });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(dbService, 'Users', state.isSigned);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log('??');
        await setDoc(docRef, {
          calendar_list: [],
        });
      } else {
        const { calendar_list } = docSnap.data();
        setList(calendar_list);
      }
    };
    if (state.isSigned) fetchData();
  }, [state]);

  return (
    <Styled.List>
      <div className="list-box">
        {list.map((element) => {
          return <Card key={element} group={element} />;
        })}
        <Card group={null} />
      </div>
    </Styled.List>
  );
};

export default List;
