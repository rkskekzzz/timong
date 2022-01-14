import React, { useState, useMemo } from 'react';
import Styled from './AddModal.styled';
import { useFormik } from 'formik';
import { User } from 'src/Entities/User';

import { Input } from '@mui/material';
import { CirclePicker } from 'react-color';
import { validForm } from '../../Utils/validForm';

type Color = object & {
  hex: string;
  hsl: object;
  hsv: object;
  oldHue: number;
  rgb: object;
  source: string;
};

const AddModal: React.FC<{
  handleModalClose: () => void;
  addUser: (user: User) => void;
}> = ({ handleModalClose, addUser }) => {
  const [isError, setIsError] = useState<{ color: boolean; name: boolean }>({
    color: false,
    name: false,
  });

  const [clr, setClr] = useState('#ffffff');
  const formik = useFormik({
    initialValues: {
      userName: '',
      userColor: '',
    },
    onSubmit: () => {
      console.log('submit');
    },
  });

  const toggleError = (error: string) => {
    const initError = { color: false, name: false };
    const newError = { color: false, name: false };

    if (error === 'color') {
      newError.color = true;
    } else {
      newError.name = true;
    }
    setIsError(newError);
    setTimeout(() => setIsError(initError), 1000);
  };

  const handleColorPick = (e: object) => {
    const _e = e as Color;
    if (_e.hex !== clr) {
      setClr(_e.hex);
      formik.values.userColor = _e.hex;
    }
  };

  const handleSubmitButton = () => {
    if (isError.color || isError.name) return;

    try {
      validForm(formik.values);
    } catch (error) {
      const _err = error as string;
      return toggleError(_err);
    }

    const user = new User(formik.values.userName, clr, []);
    addUser(user);

    formik.resetForm();
    handleModalClose();
  };

  const colorPicker = useMemo(
    () => (
      <CirclePicker width="" color={clr} onChangeComplete={handleColorPick} />
    ),
    [clr]
  );

  return (
    <Styled.ModalBox>
      <Styled.ModalBoxForm>
        {colorPicker}
        <Input
          error={isError.name ? true : false}
          autoComplete="false"
          id="userName"
          placeholder="닉네임을 입력하세요..."
          value={formik.values.userName}
          onChange={formik.handleChange}
        />
        <Styled.ModalBoxButton
          onClick={handleSubmitButton}
          variant="contained"
          color="primary"
          sx={{ bgcolor: 'Background.paper' }}
        >
          <Styled.ModalBoxSpan>확인</Styled.ModalBoxSpan>
        </Styled.ModalBoxButton>
      </Styled.ModalBoxForm>
    </Styled.ModalBox>
  );
};

export default AddModal;
