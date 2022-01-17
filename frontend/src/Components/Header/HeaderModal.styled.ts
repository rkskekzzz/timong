import styled from 'styled-components';

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  gap: 30px;
  font-size: 1.6rem;
  color: white;
  border-radius: 15px;
  padding: 5%;
`;

const ModalBoxButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Styled = {
  ModalBox,
  ModalBoxButtons,
};

export default Styled;
