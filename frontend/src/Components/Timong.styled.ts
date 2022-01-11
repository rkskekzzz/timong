import styled from 'styled-components';

const Body = styled.div`
height: 100vh;
max-width: 400px;
overflow: scroll;
display: flex;
flex-direction: column;
margin: 0 auto;
gap: 20px;
`;

const MainComponent = styled.div`
  padding: 60px 0;
`;

const VFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dfdfdf;
  padding: 10px;
  gap: 10px;
`;

const HFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
`;


export { MainComponent, Body,VFlexBox, HFlexBox };
