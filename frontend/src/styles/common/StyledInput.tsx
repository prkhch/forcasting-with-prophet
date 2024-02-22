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

const NumberInput = keyframes`
from {
  opacity: 0;
  transform: translateX(-2rem);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

export const StyledInput = styled.input`
  border: transparent;
  background-color: transparent;
  border-bottom: 1px solid #393939;
  padding-bottom: 0.2rem;
  padding-top: 0.5rem;
  width: 100%;
  height: 1rem;
  /* margin-top: 0.5rem; */
  &:focus {
    outline: none;
    border: none;
    border-radius: 4px;
    animation: ${Animation} 0.2s forwards ease-in-out;
  }
  font-family: "SuiteLight";
  font-size: 18px;
`;

export const StyledContentInput = styled.textarea`
  resize: none;
  border: transparent;
  background-color: transparent;
  border-bottom: 1px solid #393939;
  margin-top: 0.5rem;
  width: 100%;
  &:focus {
    outline: none;
    border: none;
    border-radius: 4px;
    animation: ${Animation} 0.2s forwards ease-in-out;
  }
  font-family: "SuiteLight";
  font-size: 18px;
`;

export const StyledDateInput = styled.input`
  border: transparent;
  background-color: transparent;
  border-bottom: 1px solid #393939;
  padding-bottom: 0.2rem;
  padding-top: 0.5rem;
  width: 20%;
  height: 1rem;
  /* margin-top: 0.5rem; */
  &:focus {
    outline: none;
    border: none;
    border-radius: 4px;
    animation: ${Animation} 0.2s forwards ease-in-out;
  }
  font-family: "SuiteLight";
  font-size: 18px;
`;

export const StyledNumberInput = styled.input`
  border: transparent;
  background-color: transparent;
  border-bottom: 1px solid #393939;
  padding-bottom: 0.2rem;
  width: 60%;
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
  animation: ${NumberInput} 0.5s forwards ease-in-out;
`;
