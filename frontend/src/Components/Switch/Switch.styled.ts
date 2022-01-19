import styled from 'styled-components';

const Switch = styled.div<{ bgcolor: string }>`
  height: 40px;
  margin: 8px 0;
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.bgcolor || '#fafafadf'};
  border-radius: 50px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;
const SwitchInput = styled.input`
  display: none;
`;
const SwitchLabel = styled.label`
  width: 6rem;
  position: relative;
  display: flex;
  padding: 0.4rem 0.3rem;
`;

const SwitchText = styled.div<{ color: string }>`
  flex: 1 1 0px;
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.color || '#fafafadf'};
`;

const SwitchSelected = styled.div<{ isChecked: boolean }>`
  margin: 0.1rem 0.15rem;
  width: calc(55% - 0.3rem);
  height: calc(100% - 0.2rem);
  border-radius: 50px;
  position: absolute;
  background: #f995f0b8;
  box-shadow: inset 1px 4px 10px -5px #ff5bf0b8,
    inset -1px 3px 2px 0px #5c0e55a8;
  ${(props) => {
    if (!props.isChecked)
      return `
        transition: transform 200ms ease-in-out 0ms;
        transform: translateX(calc(3.6rem - 0.6rem));
      `;
    else
      return `
        transition: transform 200ms ease-in-out 0ms;
        `;
  }};
`;

const Styled = { Switch, SwitchLabel, SwitchInput, SwitchText, SwitchSelected };

export default Styled;
