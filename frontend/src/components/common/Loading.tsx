import React from "react";
import { keyframes, styled } from "styled-components";
import { useRecoilState } from "recoil";
import { loadingState } from "recoils/atoms/loadingState";

const Loading = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  return isLoading ? (
    <StyledBackground>
      <StyledLoadingContainer>
        <StyledBlueCircle />
        <StyledBlackCircle />
        <StyledNavyCircle />
      </StyledLoadingContainer>
    </StyledBackground>
  ) : null;
};

export default Loading;

const AnimeBlack = keyframes`
  17% {
    opacity: 0.5;
    transform: translateX(0rem) translateY(0rem);
  }
  34% {
    opacity: 1;
    transform: translateX(3rem) translateY(3rem);
  }
  51% {
    opacity: 0.5;
    transform: translateX(0rem) translateY(0rem);
  }
  68% {
    opacity: 1;
    transform: translateX(0rem) translateY(-3rem);
  }
  85% {
    opacity: 0.5;
    transform: translateX(0rem) translateY(0rem);
  }

  `;

const AnimeBlue = keyframes`
  17% {
    opacity: 0.5;
    transform: translateX(0rem) translateY(0rem);
  }
  34% {
    opacity: 1;
    transform: translateX(-3rem) translateY(3rem);
  }
  51% {
    opacity: 0.5;
    transform: translateX(0rem) translateY(0rem);
  }
  68% {
    opacity: 1;
    transform: translateX(3rem) translateY(3rem);
  }
  85% {
    opacity: 0.5;
    transform: translateX(0rem) translateY(0rem);
  }

  `;

const AnimeNavy = keyframes`
  17% {
    opacity: 0.5;
    transform: translateX(0rem) translateY(0rem);
  }
  34% {
    opacity: 1;
    transform: translateX(0rem) translateY(-3rem);
  }
  51% {
    opacity: 0.5;
    transform: translateX(0rem) translateY(0rem);
  }
  68% {
    opacity: 1;
    transform: translateX(-3rem) translateY(3rem);
  }
  85% {
    opacity: 0.5;
    transform: translateX(0rem) translateY(0rem);
  }
  `;

const StyledBackground = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledNavyCircle = styled.div`
  position: absolute;
  width: 5rem;
  height: 5rem;
  background-color: #00457e;
  border-radius: 50%;
  transform: translateX(3rem) translateY(3rem);
  animation: ${AnimeNavy} 4s infinite ease-out;
`;

const StyledBlueCircle = styled.div`
  position: absolute;
  width: 5rem;
  height: 5rem;
  background-color: #2f70af;
  border-radius: 50%;
  transform: translateX(0rem) translateY(-3rem);
  animation: ${AnimeBlue} 4s infinite ease-out;
`;

const StyledBlackCircle = styled.div`
  position: absolute;
  width: 5rem;
  height: 5rem;
  background-color: #393939;
  border-radius: 50%;
  transform: translateX(-3rem) translateY(3rem);
  animation: ${AnimeBlack} 4s infinite ease-out;
`;
