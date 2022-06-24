import React, { useEffect, useState } from 'react';
import Styled from './Invite.styled';
import GlobalStyled from '../../Components/GlobalStyled/GlobalStyled.styled';
import { onAuthStateChanged } from 'firebase/auth';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CalendarService } from 'src/Network/CalendarService';
import { auth } from 'src/firebase';
import { Button } from '@mui/material';

const Invite = () => {
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [calendarName, setCalendarName] = useState<string>('');
  const location = useLocation();
  const params = useParams();
  const navi = useNavigate();

  useEffect(() => {
    console.log(params.id);
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
      const result = await CalendarService.getCalendar('/' + params.id);
      console.log(result);

      setCalendarName(result.name);
    };
    if (isSigned) getCalendar();
  }, [isSigned]);

  return (
    <Styled.InviteBox>
      <span>
        <b>T</b>
        <i>T</i>
        <b>i</b>
        <i>i</i>
        <b>m</b>
        <i>m</i>
        <b>o</b>
        <i>o</i>
        <b>n</b>
        <i>n</i>
        <b>g</b>
        <i>g</i>
        <b>!</b>
        <i>!</i>
      </span>
      <div className="flex" onClick={() => alert('hi')}>
        {isSigned ? (
          <div>
            <h3>
              {location.search}
              invited you to {calendarName}
            </h3>
            <Button>Invite Accept</Button>
          </div>
        ) : (
          <div>no..</div>
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
