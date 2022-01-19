import styled from 'styled-components';

const Switch = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #dddddd;
  background: #fafafaaa;
  border-radius: 50px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;
const SwitchInput = styled.input`
  display: none;
`;
const SwitchLabel = styled.label`
  width: 8rem;
  position: relative;
  display: flex;
  padding: 0.4rem 0.6rem;
`;

const SwitchText = styled.div`
  flex: 1 1 0px;
  font-size: 0.8rem;
  text-align: center;
`;
const Styled = { Switch, SwitchLabel, SwitchInput, SwitchText };

export default Styled;
