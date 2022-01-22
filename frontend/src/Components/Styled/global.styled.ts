import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type CircleType = 'small';

const Circle = styled.div<{ size?: CircleType }>`
  height: ${(props) => (props.size === 'small' ? '9px' : '100%')};
  width: ${(props) => (props.size === 'small' ? '9px' : '100%')};

  border-radius: 30px;
  background: ${(props) => props.color || 'white'};
`;

const X = styled(CloseRoundedIcon)<{ bgcolor?: string; size?: CircleType }>`
  && {
    height: ${(props) => (props.size === 'small' ? '9px' : '100%')};
    width: ${(props) => (props.size === 'small' ? '9px' : '100%')};
    padding: 0;
    color: ${(props) => props.bgcolor || 'white'};
  }
`;

const Xone = styled.div<{ color?: string; size?: CircleType }>`
  height: ${(props) => (props.size === 'small' ? '9px' : '100%')};
  width: ${(props) => (props.size === 'small' ? '9px' : '100%')};
  transform: translateX(0.22rem) translateY(-0.05rem);
  &: before {
    position: absolute;
    border-radius: 2px;
    content: ' ';
    height: 11px;
    width: 2px;
    background: ${(props) => props.color || 'white'};
  }
  &: after {
    position: absolute;
    border-radius: 2px;
    content: ' ';
    height: 11px;
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
  X,
};

export default Styled;
