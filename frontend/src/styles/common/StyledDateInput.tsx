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

const StyledDateInput = styled.input`
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

export default StyledDateInput;
