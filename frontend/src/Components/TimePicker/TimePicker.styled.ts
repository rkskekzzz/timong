import styled from 'styled-components';

const TimePickerBox = styled.div<{
  bgcolor: string;
  isShowTimePicker: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  height: auth;
  position: fixed;
  bottom: 0px;
  border-radius: 15px 15px 0px 0px;
  background-color: ${(props) => `${props.bgcolor ?? '#ffffff'}`};
  padding: 5%;
  ${(props) => {
    if (props.isShowTimePicker)
      return `
      transform: translateY(0%);
    `;
    else
      return `
      transform: translateY(100%);
    `;
  }};
  .paddingbox {
    width: 100%;
  }
  .hflex {
    display: flex;
    flex-direction: row;
  }
  .user-info {
    align-items: center;
    gap: 10px;

    .user-info-name {
      transform: translateY(-2px);
    }
  }
`;

const Styled = { TimePickerBox };

export default Styled;
