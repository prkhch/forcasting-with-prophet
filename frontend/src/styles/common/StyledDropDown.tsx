import { css, keyframes, styled } from "styled-components";

const SelectAnimation = keyframes`
  from {
    border: transparent;
  }
  to {
    border: #2f70af 2px solid;
    padding: 1rem;
    font-size: 18px;
  }
  `;

const DropAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
  `;

export const StyledUl = styled.ul`
  position: fixed;
  margin-bottom: 1rem;
  animation: ${DropAnimation} 0.2s forwards ease-in;
`;

export const StyledLi = styled.li`
  background-color: #ffffff;
  cursor: pointer;
  text-align: center;
  width: 6rem;
  padding: 0.3rem;
  &:hover {
    outline: none;
    border: none;
    animation: ${SelectAnimation} 0.2s forwards ease-in-out;
  }
`;

export const StyledSelect = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  cursor: pointer;
  text-align: center;
  width: 6rem;
  margin-top: 0.5rem;
  padding: 0.3rem;
  font-family: "SuiteLight";
  font-size: 18px;
  &:hover {
  }
`;
