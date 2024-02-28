import { keyframes, styled } from "styled-components";

const AniImg1 = keyframes`
  from {
    opacity: 0;
    top: -5%;
  }
  to {
    opacity: 0.7;
  }
`;

const AniImg2 = keyframes`
  from {
    opacity: 0;
    top: 10%;
  }
  to {
    opacity: 0.8;
  }
`;

const AniImg3 = keyframes`
  from {
    opacity: 0;
    top: 30%;
  }
  to {
    opacity: 0.9;
  }
`;

const AniImg4 = keyframes`
  from {
    opacity: 0;
    top: 45%;
  }
  to {
    opacity: 0.9;
  }
`;

export const StyledLogo = styled.img`
  position: absolute;
  top: 37%;
  left: 2%;
  width: 20%;
`;

export const StyledImage1 = styled.img`
  position: absolute;
  top: 5%;
  right: 23%;
  width: 25%;
  border-radius: 4px;
  animation: ${AniImg1} 0.5s ease-in 0s forwards;
`;

export const StyledImage2 = styled.img`
  position: absolute;
  top: 35%;
  right: 15%;
  width: 25%;
  border-radius: 4px;
  animation: ${AniImg2} 0.5s ease-in 0s forwards;
`;

export const StyledImage3 = styled.img`
  position: absolute;
  top: 50%;
  right: 2%;
  width: 20%;
  border-radius: 4px;
  animation: ${AniImg3} 0.5s ease-in 0s forwards;
`;

export const StyledImage4 = styled.img`
  position: absolute;
  top: 62%;
  right: 4%;
  width: 20%;
  border-radius: 4px;
  animation: ${AniImg4} 0.5s ease-in 0s forwards;
`;
