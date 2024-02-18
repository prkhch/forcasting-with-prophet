import handleFormatDate from "utils/handleFormatDate";
import React, { useState } from "react";
import { styled } from "styled-components";
import StyledOption from "styles/articleDetailPage/StyledOption";
import StyledOptionRow from "styles/articleDetailPage/StyledOptionRow";
import StyledInput from "styles/common/StyledInput";
import StyledNumberInput from "styles/common/StyledNumberInput";
import StyledText from "styles/common/StyledText";
import { ProphetOptions } from "types/ProphetOptions";

const ChangePointsInput = ({
  options,
  setOptions,
}: {
  options: ProphetOptions;
  setOptions: React.Dispatch<React.SetStateAction<ProphetOptions>>;
}) => {
  const [date, setDate] = useState("");

  return (
    <StyledInputForm>
      <StyledOptionRow>
        <StyledOption>
          <StyledText>Changepoints</StyledText>
          <StyledInput
            type="text"
            value={date}
            onChange={(e) => {
              setDate(handleFormatDate(e.target.value));
            }}
          />
        </StyledOption>
      </StyledOptionRow>

      <StyledOptionRow>
        <StyledOption>
          <StyledText>Changepoint Prior Scale</StyledText>
          <StyledNumberInput
            type="number"
            value={options.cpScale}
            onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, cpScale: Number(e.target.value) }))}
            step="0.01"
          />
        </StyledOption>
        <StyledOption>
          <StyledText>Changepoint Threshold</StyledText>
          <StyledNumberInput
            type="number"
            value={options.cpThreshold}
            onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, cpThreshold: Number(e.target.value) }))}
          />
        </StyledOption>
      </StyledOptionRow>
    </StyledInputForm>
  );
};

export default ChangePointsInput;

const StyledInputForm = styled.div`
  width: 100%;
`;
