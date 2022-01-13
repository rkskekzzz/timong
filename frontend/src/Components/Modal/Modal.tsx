import React, { useState } from 'react';
import Styled from './Modal.styled';
import { useFormik } from 'formik';

import { Modal, Input } from '@mui/material';
import { CirclePicker } from 'react-color';

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
  const [isError, setIsError] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      userName: '',
      userColor: '',
    },
    onSubmit: () => {
      console.log('submit');
    },
  });

  const handleColorPick = (e: object) => {
    const _e = e as Color;

    formik.values.userColor = _e.hex;
  };
  const handleSubmitButton = () => {
    if (isError) return;
    if (!formik.values.userColor || !formik.values.userName) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 1000);
      return;
    } else {
      formik.resetForm();
      handleModalClose();
    }
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
