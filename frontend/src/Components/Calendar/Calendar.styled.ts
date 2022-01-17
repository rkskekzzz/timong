import styled from 'styled-components';

const CalendarPaddingBox = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  * {
    color: ${(props) => props.color || '#000'};
  }
`;

export default {
  CalendarPaddingBox,
};
