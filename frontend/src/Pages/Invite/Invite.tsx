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
import { useSign } from 'src/Utils/firebaseAuth';

const Invite = () => {
  const { state, dispatch } = useContext(UserContext);
  const { isSignedIn, handleSignIn } = useSign();
  const location = useLocation();
  const navi = useNavigate();
  const theme = useTheme();
  const [done, setDone] = useState<boolean>(false);
  const [calendarName, setCalendarName] = useState<string>('');
  const split_location = location.search.split('&');
  const database_id = split_location[0].split('=')[1];
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const invitor_name =
    split_location.length > 1 ? split_location[1].split('=')[1] : '';

  const createCalendarRelation = async () => {
    if (!isSignedIn) return;
    for (let i = 0; i < state.calendarList.length; i++) {
      if (state.calendarList[i]._id === database_id) {
        alert('이미 초대된 캘린더입니다.');
        navi('/calendar?id=' + database_id);
        return;
      }
    }
    const calendar = new User(calendarName, '', [], false, database_id);
    await addSignedUserCalendar(calendar, state);
    navi('/calendar?id=' + database_id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(true);
    }, 2000);
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        dispatch({ type: 'SIGNIN', uid: _user.uid });
      }
    });
    return () => {
      clearTimeout(timer);
    };
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
    getCalendar();
  }, []);

  useEffect(() => {
    console.log(location.search);
  }, []);

  return (
    <Styled.InviteBox>
      <div className="flex">
        {done ? (
          <>
            <h3>
              {(invitor_name ? `${invitor_name} 님이` : '누군가') +
                ` ${calendarName}에 초대하셨습니다!`}
            </h3>
            {isLoad ? (
              <>
                <div className="buttons">
                  {state.isSigned || isSignedIn ? (
                    <button id="accept" onClick={createCalendarRelation}>
                      초대 수락하기
                    </button>
                  ) : (
                    <button id="accept" onClick={handleSignIn}>
                      로그인하고 초대 받기
                    </button>
                  )}
                  <Button
                    id="notAccept"
                    onClick={() => navi(`/${database_id}`)}
                    size="small"
                  >
                    비회원으로 볼래요
                  </Button>
                </div>
              </>
            ) : (
              <CircularProgress sx={{ color: theme.main.theme }} />
            )}
            <p id="notice">
              웹뷰(카카오톡 브라우저 등)에서는 로그인기능이 동작하지 않습니다!
              <br />
              사파리 or 크롬으로 열어주세요
            </p>
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
