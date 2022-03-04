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
  padding: 3vh 3vh 0 3vh;
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

    h6 {
      margin: 0;
      padding: 0;
    }
  }
  .hflex {
    display: flex;
    flex-direction: row;
  }

  .timebox {
    span {
      height: 20px;
      flex: 1 1 0;
    }
    .timebox-span {
      border-top: 1px solid #00000066;
      border-bottom: 1px solid #00000066;
      border-right: 1px solid #00000066;
    }
    .timebox-span:first-child {
      border-left: 1px solid #00000066;
    }
    .timebox-label {
      font-size: 0.8rem;
    }
  }
`;

const TimePickerHeader = styled.div`
  justify-content: space-between;
  .user-info {
    gap: 10px;
    align-items: center;
    .user-info-name {
      transform: translateY(-2px);
    }
  }
`;

const Styled = { TimePickerBox, TimePickerHeader };

export default Styled;
