import { keyframes, styled } from "styled-components";

const AniImg1 = keyframes`
  from {
    opacity: 0;
    top: 0;
  }
  to {
    opacity: 1;
  }
`;

const AniImg2 = keyframes`
  from {
    opacity: 0;
    top: 10%;
  }
  to {
    opacity: 1;
  }
`;

const AniImg3 = keyframes`
  from {
    opacity: 0;
    top: 40%;
  }
  to {
    opacity: 1;
  }
`;

const AniImg4 = keyframes`
  from {
    opacity: 0;
    top: 55%;
  }
  to {
    opacity: 1;
  }
`;

export const StyledLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 20%;
  width: 20%;
`;

export const StyledImage1 = styled.img`
  position: absolute;
  top: 5%;
  right: 18%;
  width: 25%;
  border-radius: 4px;
  opacity: 0;
  animation: ${AniImg1} 0.5s ease-in 0s forwards;
`;

export const StyledImage2 = styled.img`
  position: absolute;
  top: 20%;
  right: 5%;
  width: 25%;
  border-radius: 4px;
  opacity: 0;
  animation: ${AniImg2} 0.5s ease-in 0.5s forwards;
`;

export const StyledImage3 = styled.img`
  position: absolute;
  top: 48%;
  right: 23%;
  width: 20%;
  border-radius: 4px;
  opacity: 0;
  animation: ${AniImg3} 0.5s ease-in 1s forwards;
`;

export const StyledImage4 = styled.img`
  position: absolute;
  top: 62%;
  right: 4%;
  width: 25%;
  border-radius: 4px;
  opacity: 0;
  animation: ${AniImg4} 0.5s ease-in 1.5s forwards;
`;
