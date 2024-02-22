import React, { useState } from "react";
import { styled } from "styled-components";
import { StyledOption } from "styles/common/StyledOption";
import { StyledNumberInput } from "styles/common/StyledInput";
import { StyledText } from "styles/common/StyledText";
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
      <StyledOption>
        <StyledText>Periods</StyledText>
        <StyledNumberInput
          type="number"
          value={options.periods}
          onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, periods: Number(e.target.value) }))}
        />
      </StyledOption>
    </StyledInputForm>
  );
};

export default PeriodInput;

const StyledInputForm = styled.div`
  width: 100%;
  display: flex;
`;
