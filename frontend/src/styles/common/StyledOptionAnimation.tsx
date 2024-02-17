import styled, { keyframes } from "styled-components";

const Animation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
  `;

const StyledOptionAnimation = styled.div`
  display: flex;
  margin: 0.5rem;
  animation: ${Animation} 0.5s forwards ease-in-out;
`;

export default StyledOptionAnimation;
