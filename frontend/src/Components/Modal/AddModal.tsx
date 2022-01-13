import React, { useState } from 'react';
import Styled from './Modal.styled';
import { useFormik } from 'formik';

import { Modal, Input } from '@mui/material';
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
  isShowModal: boolean;
}> = ({ handleModalClose, isShowModal }) => {
  const [isError, setIsError] = useState<{ color: boolean; name: boolean }>({
    color: false,
    name: false,
  });
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
    type NullableBoolean = 'TRUE' | 'FALSE' | 'NONE';
    const _error = error as NullableBoolean;
    const initError = { color: false, name: false };
    const newError = { color: false, name: false };

    // newError[<NullableBoolean>error] = true;

    setTimeout(() => setIsError(initError), 2000);
  };

  const handleColorPick = (e: object) => {
    const _e = e as Color;
    formik.values.userColor = _e.hex;
  };

  const handleSubmitButton = () => {
    if (isError) return;
    try {
      validForm(formik.values);
    } catch (error) {
      toggleError(error);
    }
    formik.resetForm();
    handleModalClose();
  };

  return (
    <Modal
      open={isShowModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Styled.ModalBox>
        <Styled.ModalBoxForm>
          <CirclePicker width="" onChange={handleColorPick} />
          <Input
            error={isError ? true : false}
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
    </Modal>
  );
};

export default AddModal;
