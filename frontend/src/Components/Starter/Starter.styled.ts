import styled from 'styled-components';
import { Button } from '@mui/material';

const Starter = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const StarterModalForm = styled.form`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StarterModalButton = styled(Button)`
  && {
    background: #f995f0;
    :hover {
      background: #f995f0;
    }
  }
`;
const StarterModalTitle = styled.span`
  font-size: 3rem;
  font-weight: bold;
`;

const Styled = {
  Starter,
  StarterModalForm,
  StarterModalButton,
  StarterModalTitle,
};

export default Styled;
