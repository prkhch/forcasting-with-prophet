import styled, { keyframes } from "styled-components";

const Animation = keyframes`
  from {
    outline: transparent;
  }
  to {
    outline: #2f70af 2px solid;
    padding: 1rem;
  }
  `;

const Init = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledNumberInput = styled.input`
  border: transparent;
  background-color: transparent;
  border-bottom: 1px solid #393939;
  padding-bottom: 0.2rem;
  width: 80%;
  height: 1rem;
  margin-top: 1rem;
  &:focus {
    outline: none;
    border: none;
    border-radius: 4px;
    animation: ${Animation} 0.2s forwards ease-in-out;
  }
  font-family: "SuiteLight";
  font-size: 18px;
  animation: ${Init} 0.5s forwards ease-in-out;
`;

export default StyledNumberInput;
