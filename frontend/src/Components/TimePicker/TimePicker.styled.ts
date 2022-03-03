import NumberEx from 'src/Common/NumberEx';
import styled from 'styled-components';

const TimePickerBox = styled.div<{
  bgcolor: string;
  isShowTimePicker: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  height: ${NumberEx.timePickerHeight};
  position: fixed;
  bottom: 0px;
  left: 50%;
  border-radius: 15px 15px 0px 0px;
  background-color: ${(props) => `${props.bgcolor ?? '#ffffff'}`};
  padding: 3vh;
  ${(props) => {
    if (props.isShowTimePicker)
      return `
      transition: transform 0.5s;
      transform: translate(-50%, 0%);
    `;
    else
      return `
      transition: transform 0.5s;
      transform: translate(-50%, 100%);
    `;
  }};
  .paddingbox {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .hflex {
    display: flex;
    flex-direction: row;
  }
  .timepicker-header {
    justify-content: space-between;
    .user-info {
      gap: 10px;
      align-items: center;
      .user-info-name {
        transform: translateY(-2px);
      }
    }
  }
  .timebox {
    span {
      /* height: 30px; */
      flex: 1 1 0;
    }
  }
`;

const Styled = { TimePickerBox };

export default Styled;
