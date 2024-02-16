import { styled } from "styled-components";

export const StyledIndicator = styled.div<{ selected: boolean }>`
  cursor: pointer;
  margin-bottom: 1rem;
  color: ${(props) => (props.selected ? "#2f70af" : "#c9c9c9")};
  &:hover {
    color: #2f70af;
  }
`;
