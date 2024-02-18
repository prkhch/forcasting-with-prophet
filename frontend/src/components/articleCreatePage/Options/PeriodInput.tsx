import React, { useState } from "react";
import { styled } from "styled-components";
import StyledOption from "styles/articleDetailPage/StyledOption";
import StyledOptionRow from "styles/articleDetailPage/StyledOptionRow";
import StyledOptionValue from "styles/articleDetailPage/StyledOptionValue";
import { StyledLi, StyledSelect, StyledUl } from "styles/common/StyledDropDown";
import StyledInput from "styles/common/StyledInput";
import StyledNumberInput from "styles/common/StyledNumberInput";
import StyledOptionAnimation from "styles/common/StyledOptionAnimation";
import StyledText from "styles/common/StyledText";
import { ProphetOptions } from "types/ProphetOptions";

const AutoTF = ["auto", true, false];

const PeriodInput = ({
  options,
  setOptions,
}: {
  options: ProphetOptions;
  setOptions: React.Dispatch<React.SetStateAction<ProphetOptions>>;
}) => {
  return (
    <StyledInputForm>
      <StyledOptionRow>
        <StyledOption>
          <StyledText>Periods</StyledText>
          <StyledNumberInput
            type="number"
            value={options.periods}
            onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, periods: Number(e.target.value) }))}
          />
        </StyledOption>
      </StyledOptionRow>
    </StyledInputForm>
  );
};

export default PeriodInput;

const StyledInputForm = styled.div`
  width: 100%;
  display: flex;
`;
