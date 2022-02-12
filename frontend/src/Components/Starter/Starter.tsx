import React, { useState, useCallback, useContext } from 'react';
import { Input } from '@mui/material';
import { useFormik } from 'formik';
import Styled from './Starter.styled';
import { themes } from 'src/theme';
import { CalendarService } from 'src/Network/TimongService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'src/App';
import GlobalStyled from '../GlobalStyled.styled';

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
    dispatch({ type: 'INIT', users: result.users });
    navi(result._id);
  }, [formik]);

  // const handleValue = useCallback(
  //   (e) => {
  //     setValue(e.target.value > 25 ? 25 : e.target.value);
  //   },
  //   [setValue]
  // );

  // const handleAddValue = useCallback(() => {
  //   setValue(value + 1 >= 25 ? 25 : value + 1);
  // }, [value]);

  // const handleSubValue = useCallback(() => {
  //   setValue(!value ? value : value - 1);
  // }, [value]);

  // const handleTouchStart = useCallback(
  //   (e: React.TouchEvent<HTMLButtonElement>) => {
  //     setTouchStart(e.targetTouches[0].clientX);
  //   },
  //   [setTouchStart]
  // );

  // const handleTouchMove = useCallback(
  //   (e: React.TouchEvent<HTMLSpanElement>) => {
  //     if (isChanging) return;
  //     if (touchStart - e.targetTouches[0].clientX > 20) {
  //       handleSubValue();
  //     }
  //     if (touchStart - e.targetTouches[0].clientX < -20) {
  //       handleAddValue();
  //     }
  //     setIsChanging(true);
  //     setTimeout(() => {
  //       setIsChanging(false);
  //     }, 200);
  //   },
  //   [handleSubValue, handleAddValue, isChanging, setIsChanging]
  // );

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
      {/* <Styled.StarterModalNumberBox
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <span>Maximun </span>
        <p onClick={handleSubValue}>{'<'}</p>
        <input autoComplete="false" value={value} onChange={handleValue} />
        <p onClick={handleAddValue}>{'>'}</p>
      </Styled.StarterModalNumberBox> */}
      <Styled.StarterModalButton
        type="submit"
        onClick={handleSubmitButton}
        variant="contained"
        color="primary"
        sx={{ bgcolor: 'Background.paper' }}
      >
        Start
      </Styled.StarterModalButton>
      <b>Each calendar can be used by up to 16 people</b>
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
