import React from "react";
import { styled } from "styled-components";
import { StyledInput } from "styles/common/StyledInput";
import { StyledLabel } from "styles/common/StyledLabel";

const TitleInput = ({ title, setTitle }: { title: string; setTitle: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <StyledInputForm>
      <StyledLabel>Title</StyledLabel>
      <StyledInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    </StyledInputForm>
  );
};

export default TitleInput;

const StyledInputForm = styled.div`
  width: 60%;
`;
