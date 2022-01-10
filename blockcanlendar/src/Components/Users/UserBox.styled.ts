import styled from 'styled-components';

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

export default { UserNameLabel, HFlexUserBox };
