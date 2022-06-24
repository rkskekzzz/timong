import React, { useContext } from 'react';
import Styled from './EditButton.styled';
import { UserContext } from 'src/App';
import EditIcon from '@mui/icons-material/Edit';

const EditButton = () => {
  const { state, dispatch } = useContext(UserContext);
  const handleEditButtonTabbed = () => {
    dispatch({ type: 'SETSELECTEUSER', user: state.signedUser });
    console.log(state.signedUser);
  };
  return (
    <Styled.EditButton onClick={handleEditButtonTabbed}>
      asdfs
    </Styled.EditButton>
  );
};

export default EditButton;
