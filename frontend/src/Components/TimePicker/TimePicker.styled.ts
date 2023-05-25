import NumberEx from 'src/Common/NumberEx';
import styled from 'styled-components';

const TimePickerBox = styled.div<{
  bgcolor: string;
  fgcolor: string;
  isShowTimePicker: boolean;
  size: number;
}>`
  box-sizing: border-box;
  width: 100%;
  max-width: ${NumberEx.calendarMaxWidth};
  height: calc(${NumberEx.timePickerHeight} + env(safe-area-inset-bottom));
  position: fixed;
  bottom: 0px;
  z-index: 300;
  border-radius: 15px 15px 0px 0px;
  background-color: ${(props) => `${props.bgcolor ?? '#ffffff'}`};
  padding: 3vh 3vh calc(env(safe-area-inset-bottom) + 3vh) 3vh;
  ${(props) => {
    if (props.isShowTimePicker)
      return `
      transition: transform 0.5s;
      transform: translate(0%, 0%);
    `;
    else
      return `
      transition: transform 0.5s;
      transform: translate(0%, 100%);
    `;
  }};

  * {
    color: ${(props) => `${props.fgcolor ?? '#ffffff'}`};
  }

  .paddingbox {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    .subtitle {
      font-weight: 300;
    }
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
      flex: 1 1 0;
    }
    .timebox-span {
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 1px;
      .timebox-span-color {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 1px solid ${(props) => `${props.fgcolor + '33' ?? '#ffffff'}`};
        transition: all 0.25s ease-in-out 0ms;
      }
      .filled {
        background: ${(props) => `${props.fgcolor + '33' ?? '#ffffff'}`};
      }
    }

    .timebox-label {
      font-size: 0.5rem;
      text-align: center;
    }
  }
`;

const TimePickerHeader = styled.div`
  justify-content: space-between;
  gap: 0px;
  .user-info {
    gap: 5px;
    align-items: center;
    .user-info-name {
      transform: translateY(-2px);
    }
  }
`;

const Styled = { TimePickerBox, TimePickerHeader };

export default Styled;
