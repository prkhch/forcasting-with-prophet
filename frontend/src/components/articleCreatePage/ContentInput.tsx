import React from "react";
import { styled } from "styled-components";
import StyledContent from "styles/homePage/StyledContent";
import StyledContentInput from "styles/StyledContentInput";
import StyledLabel from "styles/StyledLabel";

const ContentInput = ({
  content,
  setContent,
}: {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <StyledInputForm>
      <StyledLabel>Content</StyledLabel>
      <StyledContentInput value={content} onChange={(e) => setContent(e.target.value)} />
    </StyledInputForm>
  );
};

export default ContentInput;

const StyledInputForm = styled.div`
  width: 100%;
`;
