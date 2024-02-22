import styled from "styled-components";

export const StyledButton = styled.button`
  margin-top: 1rem;
  margin: 1rem 0.5rem 0 0.5rem;
  background-color: #2f70af;
  border-radius: 4px;
  padding: 1rem;
  font-family: "SuiteLight", sans-serif;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #00457e;
  }
`;

export const StyledPageButton = styled.svg`
  cursor: pointer;
  &:hover {
    path {
      fill: #2f70af;
    }
  }
`;

export const StyledPlusButton = styled.svg`
  margin: 1rem;
  cursor: pointer;

  &:hover {
    #circle {
      fill: #2f70af;
    }
    #cross {
      fill: #f9f9f9;
    }
  }
`;
