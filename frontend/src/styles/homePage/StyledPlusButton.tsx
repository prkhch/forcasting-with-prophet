import styled from "styled-components";

const StyledPlusButton = styled.svg`
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

export default StyledPlusButton;
