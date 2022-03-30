import React, { useState, useCallback, useContext } from 'react';
import { Input } from '@mui/material';
import { useFormik } from 'formik';
import Styled from './Starter.styled';
import { themes } from 'src/theme';
import { CalendarService } from 'src/Network/TimongService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'src/App';
import SignInButton from './SignInButton';
import GlobalStyled from '../GlobalStyled/GlobalStyled.styled';

const StarterInputs = () => {
  const { dispatch } = useContext(UserContext);
  const navi = useNavigate();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  // const [touchStart, setTouchStart] = useState<number>(0);
  // const [isChanging, setIsChanging] = useState<boolean>(false);
  // const [value, setValue] = useState<number>(16);

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
    navi('anony/' + result._id);
  }, [formik]);

  return (
    <Styled.StarterModalForm onSubmit={handleSubmit}>
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
        <Styled.StarterModalButton
          type="submit"
          onClick={handleSubmitButton}
          variant="contained"
          color="primary"
          sx={{ bgcolor: 'Background.paper' }}
        >
          Start
        </Styled.StarterModalButton>
        <SignInButton />
      </div>
    </Styled.StarterModalForm>
  );
};

const Starter = () => {
  return (
    <Styled.Starter style={{ background: themes.main.background }}>
      <GlobalStyled.Cloud bgcolor="white">
        <div className="clouds">
          <div className="cloud x1" />
          <div className="cloud x2" />
          <div className="cloud x3" />
          <div className="cloud x4" />
          <div className="cloud x5" />
        </div>
      </GlobalStyled.Cloud>
      <Styled.StarterModalTitle style={{ color: themes.main.theme }}>
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
      </Styled.StarterModalTitle>
      <StarterInputs />
    </Styled.Starter>
  );
};

export default Starter;
