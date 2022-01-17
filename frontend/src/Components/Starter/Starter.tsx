import React from 'react';
import { Input } from '@mui/material';
import { useFormik } from 'formik';
import Styled from './Starter.styled';
import { themes } from 'src/theme';

const StarterInputs = () => {
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

  return (
    <Styled.StarterModalForm>
      <Input
        // error={isError.name ? true : false}
        autoComplete="false"
        id="calendarName"
        placeholder="닉네임을 입력하세요..."
        value={formik.values.calendarName}
        onChange={formik.handleChange}
      />
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
