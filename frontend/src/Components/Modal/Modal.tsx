import React from 'react';
import Styled from './Modal.styled';
import { useFormik } from 'formik';

import { Modal, Input, Button } from '@mui/material';
import { CirclePicker, CirclePickerProps } from 'react-color';

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
            placeholder="닉네임을 입력하세요..."
            value={formik.values.userName}
          />
          <Button
            onClick={handleModalClose}
            variant="contained"
            sx={{ background: '#f995f0' }}
            type="submit"
          >
            <Styled.ModalBoxSpan>확인</Styled.ModalBoxSpan>
          </Button>
        </Styled.ModalBoxForm>
      </Styled.ModalBox>
    </Modal>
  );
};

export default AddModal;
