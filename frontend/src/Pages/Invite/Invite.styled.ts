import styled from 'styled-components';

const InviteBox = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  .flex {
    width: 50%;
    @media (max-width: 768px) {
      width: 80vw;
    }
    max-width: 500px;
    height: 40%;
    z-index: 1000;
    display: flex;
    gap: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fafafa55;
    border-radius: 30px;
    box-shadow: 2px 4px 5px -1px rgb(0, 0, 0, 0.2);
    h3 {
      text-align: center;
      margin: 0;
      padding: 0;
    }

    .buttons {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      #accept {
        font-size: 1.3rem;
        font-weight: 900;
        width: 27vw;
        @media (max-width: 768px) {
          width: 50vw;
        }
        height: 6vh;
        background: #f995f0;
        border: 1px solid #f995f0;
        border-radius: 10px;
        color: #ffffff;

        &:hover {
          background: #f995f0bb;
        }
      }

      #notAccept {
      }
    }
    backdrop-filter: blur(15px);
  }
`;

const Styled = {
  InviteBox,
};

export default Styled;
