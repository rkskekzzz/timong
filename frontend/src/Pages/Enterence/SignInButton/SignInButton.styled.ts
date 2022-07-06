import styled from 'styled-components';

const GoogleButton = styled.button`
  position: relative;
  z-index: 1500;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #ffffff;
  width: 200px;
  border-radius: 5px;
  border: 0px;
  padding: 0px 10px;
  margin: 0px;
  margin-top: 15px;
  box-shadow: rgb(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgb(0, 0, 0, 0.14) 0px 2px 2px 0px, rgb(0, 0, 0, 0.12) 0px 1px 5px 0px;
  p {
    width: 100%;
    text-align: center;
  }
  :hover {
    box-shadow: rgb(0, 0, 0, 0.2) 0px 2px 4px -1px,
      rgb(0, 0, 0, 0.14) 0px 4px 5px 0px, rgb(0, 0, 0, 0.12) 0px 1px 10px 0px;
  }
`;

const Styled = { GoogleButton };

export default Styled;
