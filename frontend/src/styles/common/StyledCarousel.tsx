import { styled } from "styled-components";

export const StyledCarousel = styled.div`
  .slick-prev:before,
  .slick-next:before {
    color: #2f70af;
  }

  .slick-dots li button:before {
    color: #2f70af;
  }

  margin: 1rem 0 4rem 0;
`;

export const StyledIndicator = styled.div<{ selected: boolean }>`
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0 0.3rem 0 0.3rem;
  color: ${(props) => (props.selected ? "#2f70af" : "#c9c9c9")};
  &:hover {
    color: #2f70af;
  }
`;

export const StyledImage = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem 4rem 1rem 4rem;
  width: 40%;
  cursor: pointer;
`;
