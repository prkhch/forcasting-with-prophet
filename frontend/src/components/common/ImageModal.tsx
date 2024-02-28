import React from "react";
import styled from "styled-components";

const ImageModal = ({
  imageUrl,
  setImageModal,
}: {
  imageUrl: string;
  setImageModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <StyledImageModal onClick={() => setImageModal(false)}>
      <StyledImage src={imageUrl} alt="Selected Image" />
    </StyledImageModal>
  );
};

export default ImageModal;

export const StyledImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  cursor: pointer;
`;

export const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
