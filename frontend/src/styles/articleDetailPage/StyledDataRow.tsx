import { styled } from "styled-components";

const StyledDataRow = styled.div`
  display: flex;
  border-radius: 4px;
  width: 1920px;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:nth-child(odd) {
    background-color: #ffffff;
  }
`;

export default StyledDataRow;
