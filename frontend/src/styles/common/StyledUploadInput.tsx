import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

export const StyledHiddendInput = styled.input`
  display: none;
`;

export const StyledUploadButton = styled.svg`
  cursor: pointer;
  background-color: transparent;
  /* padding: 1rem; */
  /* margin: 1rem; */
  &:hover {
    path {
      fill: #2f70af;
    }
  }
`;

export const StyledFileName = styled.div`
  font-family: "SuiteLight";
  font-size: 12px;
  color: #b9b9b9;
`;
