import { styled } from "styled-components";

export const StyledAllArticles = styled.div`
  width: 100%;
`;

export const StyledArticles = styled.div`
  width: 60%;
  padding: 1rem;
`;

export const StyledArticle = styled.div`
  padding: 0.3rem;
  border-bottom: 1px #393939 solid;
  cursor: pointer;
  &:hover {
    background-color: #2f70af;
    * {
      color: white;
    }
  }
`;

export const StyledTitle = styled.div`
  font-family: "SuiteRegular", sans-serif;
  font-size: 18px;
  color: #393939;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledContent = styled.div`
  font-family: "SuiteLight", sans-serif;
  font-size: 14px;
  color: #393939;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.5rem;
`;
