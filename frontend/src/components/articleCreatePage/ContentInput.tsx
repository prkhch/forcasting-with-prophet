import React, { useRef, useEffect } from "react";
import { styled } from "styled-components";
import { StyledContentInput } from "styles/common/StyledInput";
import { StyledLabel } from "styles/common/StyledLabel";

const ContentInput = ({
  content,
  setContent,
}: {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <StyledInputForm>
      <StyledLabel>Content</StyledLabel>
      <StyledContentInput ref={textareaRef} value={content} onChange={(e) => setContent(e.target.value)} />
    </StyledInputForm>
  );
};

export default ContentInput;

const StyledInputForm = styled.div`
  width: 60%;
`;
