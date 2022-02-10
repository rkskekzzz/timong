import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Input } from '@mui/material';
import { useFormik } from 'formik';
import Styled from './Starter.styled';
import { themes } from 'src/theme';
import { CalendarService } from 'src/Network/TimongService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'src/App';

const StarterInputs = () => {
  const { dispatch } = useContext(UserContext);
  const navi = useNavigate();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [value, setValue] = useState<number>(16);

  const formik = useFormik({
    initialValues: {
      calendarName: '',
    },
    onSubmit: () => {
      console.log('submit');
    },
  });

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
  }, [formik, value]);

  const handleValue = useCallback(
    (e) => {
      setValue(e.target.value > 25 ? 25 : e.target.value);
    },
    [setValue]
  );

  const handleAddValue = useCallback(() => {
    setValue(value + 1 >= 25 ? 25 : value + 1);
  }, [value]);

  const handleSubValue = useCallback(() => {
    setValue(!value ? value : value - 1);
  }, [value]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLButtonElement>) => {
      setTouchStart(e.targetTouches[0].clientX);
    },
    [setTouchStart]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLSpanElement>) => {
      if (isChanging) return;
      if (touchStart - e.targetTouches[0].clientX > 20) {
        handleSubValue();
      }
      if (touchStart - e.targetTouches[0].clientX < -20) {
        handleAddValue();
      }
      setIsChanging(true);
      setTimeout(() => {
        setIsChanging(false);
      }, 200);
    },
    [handleSubValue, handleAddValue, isChanging, setIsChanging]
  );
  useEffect(() => {
    console.log(formik.values.calendarName);
  }, [formik.values.calendarName]);

  return (
    <Styled.StarterModalForm>
      <Input
        error={isEmpty ? true : false}
        autoComplete="false"
        id="calendarName"
        placeholder="캘린더 이름을 입력하세요..."
        value={formik.values.calendarName}
        onChange={formik.handleChange}
        sx={{ width: '100%' }}
        inputProps={{ maxLength: 12 }}
      />
      <Styled.StarterModalNumberBox
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <span>최대 인원</span>
        <p onClick={handleSubValue}>{'<'}</p>
        <input autoComplete="false" value={value} onChange={handleValue} />
        <p onClick={handleAddValue}>{'>'}</p>
      </Styled.StarterModalNumberBox>
      <Styled.StarterModalButton
        onClick={handleSubmitButton}
        variant="contained"
        color="primary"
        sx={{ bgcolor: 'Background.paper' }}
      >
        {/* <Styled.ModalBoxSpan>확인</Styled.ModalBoxSpan> */}
        확인
      </Styled.StarterModalButton>
    </Styled.StarterModalForm>
  );
};

const Starter = () => {
  return (
    <Styled.Starter style={{ background: themes.main.background }}>
      <Styled.StarterModalTitle style={{ color: themes.main.theme }}>
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
      </Styled.StarterModalTitle>
      <StarterInputs />
    </Styled.Starter>
  );
};

export default Starter;
