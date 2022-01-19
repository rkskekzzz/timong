import React, { useState, useCallback } from 'react';
import { Input } from '@mui/material';
import { useFormik } from 'formik';
import Styled from './Starter.styled';
import { themes } from 'src/theme';

// let prev_windows_scrollX = 0;

const StarterInputs = () => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [value, setValue] = useState<number>(4);

  const formik = useFormik({
    initialValues: {
      calendarName: '',
    },
    onSubmit: () => {
      console.log('submit');
    },
  });
  const handleSubmitButton = () => {
    console.log('here');
  };
  const handleValue = (e) =>
    setValue(e.target.value > 25 ? 25 : e.target.value);

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

  return (
    <Styled.StarterModalForm>
      <Input
        // error={isError.name ? true : false}
        autoComplete="false"
        id="calendarName"
        placeholder="캘린더 이름을 입력하세요..."
        value={formik.values.calendarName}
        onChange={formik.handleChange}
        sx={{ width: '100%' }}
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
        Timong !
      </Styled.StarterModalTitle>
      <StarterInputs />
    </Styled.Starter>
  );
};

export default Starter;
