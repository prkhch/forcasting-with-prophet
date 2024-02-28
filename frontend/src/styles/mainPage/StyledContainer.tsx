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
  background-image: linear-gradient(rgba(255, 255, 255, 1), rgba(47, 112, 175, 0.3)), url("main/bg.jfif");
  background-size: cover;
  background-position: center;
  height: 100vh;
  animation: ${Animation} 1s;
`;
