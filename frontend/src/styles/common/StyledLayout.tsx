import styled from "styled-components";

export const StyledBackGround = styled.div`
  /* background-color: #f9f9f9; */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const StyledRowLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  #pageButton {
    padding: 1rem 0;
    svg {
      margin: 0 1rem;
    }
  }
`;

export const StyledColLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const StyledContent = styled.div`
  flex: 1;
`;
