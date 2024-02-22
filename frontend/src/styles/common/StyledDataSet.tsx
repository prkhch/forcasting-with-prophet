import { styled } from "styled-components";

export const StyledDataSet = styled.div`
  /* border: 1px solid #393939; */
  border-radius: 4px;
  overflow-y: scroll;
  height: 150px;
  width: 100%;
  margin-top: 6px;
`;

export const StyledDataRow = styled.div`
  display: flex;
  /* width: 2000px; */
  /* width: 120%; */

  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:nth-child(odd) {
    background-color: #ffffff;
  }
`;

export const StyledDataItem = styled.div`
  /* border: 1px solid #393939; */
  padding: 3px;
  width: 5%;
`;
