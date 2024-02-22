import { keyframes, styled } from "styled-components";

export const StyledOptions = styled.div`
  font-family: "SuiteLight", sans-serif;
  font-size: 15px;
  color: #393939;
  padding: 3px;
  width: 60%;
`;

export const StyledOptionRow = styled.div`
  display: flex;
  margin: 0.5rem 0;
`;

export const StyledOption = styled.div`
  margin: 0 0.5rem 0 0;
  width: 100%;
`;

export const StyledOptionKey = styled.div`
  margin-right: 3px;
`;

export const StyledOptionValue = styled.div`
  /* text-align: center; */
  color: #b9b9b9;
  font-family: "SuiteRegular", sans-serif;
  font-size: 18px;
  margin-top: 1rem;
`;

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

export const StyledOptionAnimation = styled.div`
  display: flex;
  margin: 0.5rem;
  animation: ${Animation} 0.5s forwards ease-in-out;
`;
