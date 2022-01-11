import styled from 'styled-components';

type CircleType = 'small';
const Circle = styled.div<{ size?: CircleType }>`
  // margin: 0 auto;
  // border-radius: 50%;
  // width: ${(props) => (props.size === 'small' ? '9px' : '11px')};
  // height: ${(props) => (props.size === 'small' ? '9px' : '11px')};
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: ${(props) => props.color || 'white'};
`;

export default {
  Circle,
};
