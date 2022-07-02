import React, { useEffect, useState, useContext } from 'react';
import Styled from './Invite.styled';
import GlobalStyled from '../../Components/GlobalStyled/GlobalStyled.styled';
import { onAuthStateChanged } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarService } from 'src/Network/CalendarService';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from 'src/firebase';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material';
import { addSignedUserCalendar } from 'src/Hooks/firebaseRelation';
import { fetchCalendarList } from 'src/Hooks/firebaseRelation';
import { User } from 'src/Interface/UserType';
import { UserContext } from 'src/App';

const Invite = () => {
  const { state, dispatch } = useContext(UserContext);
  const location = useLocation();
  const navi = useNavigate();
  const theme = useTheme();
  const [done, setDone] = useState<boolean>(false);
  const [calendarName, setCalendarName] = useState<string>('');
  const database_id = location.search.split('&')[0].split('=')[1];
  const invitor_name = location.search.split('&')[1].split('=')[1];

  const createCalendarRelation = () => {
    for (let i = 0; i < state.calendarList.length; i++) {
      if (state.calendarList[i]._id === database_id) {
        alert('이미 초대된 캘린더입니다.');
        navi('/calendar?id=' + database_id);
        return;
      }
    }
    const calendar = new User(calendarName, '', [], database_id);
    addSignedUserCalendar(calendar, state);
    navi('/calendar?id=' + database_id);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        dispatch({ type: 'SIGNIN', uid: _user.uid });
      }
    });
  }, []);

  useEffect(() => {
    if (state.isSigned) fetchCalendarList(state, dispatch);
  }, [state.isSigned]);

  useEffect(() => {
    setDone(true);
  }, [state.calendarList]);

  useEffect(() => {
    const getCalendar = async () => {
      const result = await CalendarService.getCalendar('/' + database_id);
      if (!result) navi('/404');
      setCalendarName(result.name);
    };
    if (state.isSigned) getCalendar();
  }, [state.isSigned]);

  useEffect(() => {
    console.log(location.search);
  }, []);

  return (
    <Styled.InviteBox>
      <div className="flex">
        {done ? (
          <>
            <h3>{`${invitor_name} 님이 ${calendarName}에 초대하셨습니다!`}</h3>
            <div className="buttons">
              <button id="accept" onClick={createCalendarRelation}>
                초대 수락하기
              </button>
              <Button
                id="notAccept"
                onClick={() => navi('/database_id')}
                size="small"
              >
                비회원으로 볼래요
              </Button>
            </div>
          </>
        ) : (
          <CircularProgress sx={{ color: theme.main.theme }} />
        )}
      </div>
      <GlobalStyled.Cloud bgcolor="#ffd8fb">
        <div className="clouds">
          <div className="cloud x1" />
          <div className="cloud x2" />
          <div className="cloud x3" />
          <div className="cloud x4" />
          <div className="cloud x5" />
        </div>
      </GlobalStyled.Cloud>
    </Styled.InviteBox>
  );
};

export default Invite;
