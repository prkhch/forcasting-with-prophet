import { styled } from "styled-components";

const StyledLink = styled.a`
  font-family: "SuiteLight", sans-serif;
  font-size: 14px;
  color: #b9b9b9;
  &:hover {
    color: #393939;
  }
  text-decoration: underline;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1rem 0;
`;

export default StyledLink;
