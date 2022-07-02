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
import { User } from 'src/Interface/UserType';
import { UserContext } from 'src/App';

const Invite = () => {
  const { state } = useContext(UserContext);
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [calendarName, setCalendarName] = useState<string>('');
  const location = useLocation();
  const navi = useNavigate();
  const theme = useTheme();
  const database_id = location.search.split('=')[1];

  const createCalendarRelation = () => {
    const calendar = new User(calendarName, '', [], database_id);
    addSignedUserCalendar(calendar, state);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        setIsSigned(true);
      } else {
        setIsSigned(false);
      }
    });
  }, []);

  useEffect(() => {
    const getCalendar = async () => {
      const result = await CalendarService.getCalendar('/' + database_id);
      // if (!result) navi('/404');
      setCalendarName(result.name);
    };
    if (isSigned) getCalendar();
  }, [isSigned]);

  return (
    <Styled.InviteBox>
      <div className="flex">
        {isSigned ? (
          <div>
            <h3>
              {database_id}
              invited you to {calendarName}
            </h3>
            <Button onClick={createCalendarRelation}>Invite Accept</Button>
            <Button onClick={() => navi('/database_id')}>
              {' '}
              비회원으로 달력 보기
            </Button>
          </div>
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
