import React, { useState, useCallback, useContext } from 'react';
import Styled from './AddModal.styled';
import { useFormik } from 'formik';
import { User } from 'src/Interface/UserType';
import { Input, Modal } from '@mui/material';
import { CirclePicker } from 'react-color';
import { validForm } from '../../Utils';
import { useTheme } from '@mui/material';
import { State } from 'src/Interface/ContextType';
import { fetchCalendarList } from 'src/Hooks/firebaseRelation';
import { UserContext } from 'src/App';

type Color = object & {
  hex: string;
  hsl: object;
  hsv: object;
  oldHue: number;
  rgb: object;
  source: string;
};

const colors = [
  '#A93226',
  '#CB4335',
  '#884EA0',
  '#7D3C98',
  '#2471A3',
  '#2E86C1',
  '#17A589',
  '#138D75',
  '#229954',
  '#28B463',
  '#D4AC0D',
  '#D68910',
  '#CA6F1E',
  '#BA4A00',
  '#460000',
  '#0c0046',
  '#2E4053',
];

function ModalBoxFormLogic({
  handleModalClose,
  placeholder,
  action,
}: {
  handleModalClose: () => void;
  placeholder: string;
  action: (user: User, state: State) => Promise<void>;
}) {
  const { state, dispatch } = useContext(UserContext);
  const [isError, setIsError] = useState<{ color: boolean; name: boolean }>({
    color: false,
    name: false,
  });

  const [clr, setClr] = useState<string>('#868686');
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

  const handleSubmitButton = async () => {
    if (isError.color || isError.name) return;
    if (clr === '#868686') {
      alert('Pick the Color!');
      return;
    }
    try {
      validForm(formik.values);
    } catch (error) {
      const _err = error as string;
      return toggleError(_err);
    }
    const user = new User(formik.values.userName, clr, [], '');
    formik.resetForm();
    handleModalClose();
    await action(user, state);
    await fetchCalendarList(state, dispatch);
  };

  const handleColorPick = (e: object) => {
    const _e = e as Color;
    if (_e.hex !== clr) {
      setClr(_e.hex);
    }
  };
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <Styled.ModalBoxForm onSubmit={handleSubmit}>
      <CirclePicker
        width=""
        color={clr}
        colors={[...colors, state.mode == 'dark' ? '#ffffff' : '#000000']}
        onChangeComplete={handleColorPick}
      />
      <Input
        error={isError.name ? true : false}
        autoComplete="false"
        id="userName"
        placeholder={placeholder}
        value={formik.values.userName}
        onChange={formik.handleChange}
        inputProps={{ maxLength: 10 }}
      />
      <Styled.ModalBoxButton
        // type="submit"
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
  action: (user: User, state: State) => Promise<void>;
  handleModalClose: () => void;
  isShowModal: boolean;
  placeholder: string;
}> = ({ handleModalClose, isShowModal, placeholder, action }) => {
  const theme = useTheme();
  return (
    <Modal
      open={isShowModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Styled.ModalBox style={{ background: theme.myPalette.backgroundModal }}>
        <ModalBoxFormLogic
          handleModalClose={handleModalClose}
          placeholder={placeholder}
          action={action}
        />
      </Styled.ModalBox>
    </Modal>
  );
};

export default AddModal;
