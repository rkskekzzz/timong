import React, { useState } from 'react';
import Styled from './AddModal.styled';
import { useFormik } from 'formik';
import { User } from 'src/Entities/User';

import { Input, Modal } from '@mui/material';
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

function ModalBoxFormLogic({
  handleModalClose,
  addUser,
}: {
  handleModalClose: () => void;
  addUser: (user: User) => void;
}) {
  const [isError, setIsError] = useState<{ color: boolean; name: boolean }>({
    color: false,
    name: false,
  });

  const [clr, setClr] = useState<string>('#ffffff');
  const formik = useFormik({
    initialValues: {
      userName: '',
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

  const handleColorPick = (e: object) => {
    const _e = e as Color;
    if (_e.hex !== clr) {
      console.log('not same');

      setClr(_e.hex);
    }
  };

  return (
    <Styled.ModalBoxForm>
      <CirclePicker width="" color={clr} onChangeComplete={handleColorPick} />
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
  );
}

const AddModal: React.FC<{
  handleModalClose: () => void;
  addUser: (user: User) => void;
  isShowModal: boolean;
}> = ({ handleModalClose, addUser, isShowModal }) => {
  return (
    <Modal
      open={isShowModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Styled.ModalBox>
        <ModalBoxFormLogic
          handleModalClose={handleModalClose}
          addUser={addUser}
        />
      </Styled.ModalBox>
    </Modal>
  );
};

export default AddModal;
