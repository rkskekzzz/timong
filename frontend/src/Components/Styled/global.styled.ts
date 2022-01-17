import styled from 'styled-components';

type CircleType = 'small';

const Circle = styled.div<{ size?: CircleType }>`
  // width: ${(props) => (props.size === 'small' ? '9px' : '11px')};
  // height: ${(props) => (props.size === 'small' ? '9px' : '11px')};
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background: ${(props) => props.color || 'white'};
`;

const Xone = styled.div<{ color?: string }>`
  width: 100%;
  height: 100%;
  margin-left: 3px;

  &: before {
    position: absolute;
    content: ' ';
    height: 9px;
    width: 2px;
    background: ${(props) => props.color || 'white'};
  }
  &: after {
    position: absolute;
    content: ' ';
    height: 9px;
    width: 2px;
    background: ${(props) => props.color || 'white'};
  }

  &: before {
    transform: rotate(45deg);
  }
  &: after {
    transform: rotate(-45deg);
  }
`;
const Styled = {
  Circle,
  Xone,
};

export default Styled;
