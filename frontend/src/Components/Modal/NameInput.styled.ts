import styled from 'styled-components';
import { Button } from '@mui/material';

const ModalBoxSpan = styled.span`
  font-size: 1.1rem;
`;

const ModalBoxButton = styled(Button)`
  && {
    background: #f995f0;
    :hover {
      background: #f995f0;
    }
  }
`;

const Styled = { ModalBoxButton, ModalBoxSpan };

export default Styled;
