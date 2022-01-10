import styled from 'styled-components';
// import styled from 'styled-components';

const UserNameLabel = styled.span`
  font-size: 1.2rem;
`;
const HFlexUserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 2px 5px;
  border-radius: 12px;
  background: #f0f0f0;
`;

// export default { UserNameLabel, HFlexUserBox };

const BottomShadowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  box-shadow: 0px 2px 2px 1px #dadada;
  position: sticky;
  top: 0;
`;

const HScrollBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow: scroll;
  padding: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  // background: #25a5b3;
`;

export default { BottomShadowBox, HScrollBox, UserNameLabel, HFlexUserBox };
