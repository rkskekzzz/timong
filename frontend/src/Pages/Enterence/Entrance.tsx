import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from '@mui/material';
import { useFormik } from 'formik';
import Styled from './Entrance.styled';
import { themes } from 'src/theme';
import { CalendarService } from 'src/Network/CalendarService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'src/App';
import SignInButton from './SignInButton';
import GlobalStyled from 'src/Components/GlobalStyled/GlobalStyled.styled';

const EntranceInputs = () => {
  const { dispatch } = useContext(UserContext);
  const location = useLocation();
  const navi = useNavigate();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      calendarName: '',
    },
    onSubmit: () => {
      console.log('submit');
    },
  });
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleSubmitButton = useCallback(async () => {
    if (formik.values.calendarName === '') {
      setIsEmpty(true);
      setTimeout(() => {
        setIsEmpty(false);
      }, 1000);
      return;
    }
    const result = await CalendarService.create(formik.values.calendarName);
    dispatch({
      type: 'INIT',
      users: result.users,
      meetingDays: result.meetingDays,
    });
    console.log(result);
    navi('/' + result._id);
  }, [formik]);

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  return (
    <Styled.EntranceModalForm onSubmit={handleSubmit}>
      <Input
        error={isEmpty ? true : false}
        autoComplete="false"
        id="calendarName"
        placeholder="Input calendar name..."
        value={formik.values.calendarName}
        onChange={formik.handleChange}
        sx={{ width: '100%' }}
        inputProps={{ maxLength: 12 }}
      />
      <div>
        <Styled.EntranceModalButton
          type="submit"
          onClick={handleSubmitButton}
          variant="contained"
          color="primary"
          sx={{ bgcolor: 'Background.paper' }}
        >
          Start
        </Styled.EntranceModalButton>
        {location.pathname === '/' && <SignInButton />}
      </div>
    </Styled.EntranceModalForm>
  );
};

const Entrance = () => {
  return (
    <Styled.Entrance style={{ background: themes.main.background }}>
      <GlobalStyled.Cloud bgcolor="white">
        <div className="clouds">
          <div className="cloud x1" />
          <div className="cloud x2" />
          <div className="cloud x3" />
          <div className="cloud x4" />
          <div className="cloud x5" />
        </div>
      </GlobalStyled.Cloud>
      <Styled.EntranceModalTitle style={{ color: themes.main.theme }}>
        <b className="t">T</b>
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
      </Styled.EntranceModalTitle>
      <EntranceInputs />
    </Styled.Entrance>
  );
};

export default Entrance;
