import React from "react";
import { StyledLabel } from "styles/common/StyledLabel";
import { StyledContainer, StyledHiddendInput, StyledFileName } from "styles/common/StyledUploadInput";
import UploadButton from "./UploadButton";

const UploadInput = ({
  fileInput,
  handleChangeUpload,
  fileName,
}: {
  fileInput: React.RefObject<HTMLInputElement>;
  handleChangeUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
}) => {
  const handleUpload = () => {
    if (!fileInput.current) return;
    fileInput.current.click();
  };

  return (
    <StyledContainer>
      <StyledHiddendInput type="file" ref={fileInput} onChange={handleChangeUpload} />

      <UploadButton func={handleUpload} />
      <StyledFileName>{fileName}</StyledFileName>
    </StyledContainer>
  );
};

export default UploadInput;
