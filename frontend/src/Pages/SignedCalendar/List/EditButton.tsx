import React from 'react';
import Styled from './EditButton.styled';
import EditIcon from '@mui/icons-material/Edit';

const EditButton = () => {
  const handleEditButtonTabbed = () => {
    console.log('hi');
  };
  return (
    <Styled.EditButton onClick={handleEditButtonTabbed}>
      asdfs
    </Styled.EditButton>
  );
};

export default EditButton;
