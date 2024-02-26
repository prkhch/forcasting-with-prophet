import { keyframes, styled } from "styled-components";

const Animation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledContainer = styled.div`
  background: linear-gradient(90deg, #f9f9f9 50%, #2f70af 50%);
  background-size: cover;
  background-position: center;
  height: 100vh;
  animation: ${Animation} 1s;
`;
