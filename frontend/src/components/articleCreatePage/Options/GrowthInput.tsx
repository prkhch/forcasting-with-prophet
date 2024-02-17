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

const Growth = ["linear", "logistic"];

const GrowthInput = ({
  options,
  setOptions,
}: {
  options: ProphetOptions;
  setOptions: React.Dispatch<React.SetStateAction<ProphetOptions>>;
}) => {
  const [visible, setVisible] = useState(false);
  const [selectName, setSelectName] = useState(options.growth);

  const handleGrowthChange = (value: string) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      growth: value,
    }));
    setSelectName(value);
  };

  return (
    <StyledInputForm>
      <StyledOptionRow>
        <StyledOption>
          <StyledText>Growth</StyledText>
          <StyledSelect onClick={() => setVisible(!visible)}>
            {selectName}
            <img src="icons/dropdown_arrow.svg" alt="" />
          </StyledSelect>
          {visible && (
            <StyledUl>
              {Growth.map((value, idx) => (
                <StyledLi
                  key={idx}
                  onClick={() => {
                    handleGrowthChange(value);
                    setVisible(false);
                  }}
                >
                  {value}
                </StyledLi>
              ))}
            </StyledUl>
          )}
        </StyledOption>
      </StyledOptionRow>

      {options?.growth == "logistic" && (
        <StyledOptionAnimation>
          <StyledOption>
            <StyledText>Dataframe Cap</StyledText>
            <StyledNumberInput
              type="number"
              value={options.dfCap}
              onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, dfCap: Number(e.target.value) }))}
              step="0.1"
            />
          </StyledOption>
          <StyledOption>
            <StyledText>Dataframe Floor</StyledText>
            <StyledNumberInput
              type="number"
              value={options.dfFloor}
              onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, dfFloor: Number(e.target.value) }))}
              step="0.1"
            />
          </StyledOption>
          <StyledOption>
            <StyledText>Future Cap</StyledText>
            <StyledNumberInput
              type="number"
              value={options.ftCap}
              onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, ftCap: Number(e.target.value) }))}
              step="0.1"
            />
          </StyledOption>
          <StyledOption>
            <StyledText>Future Floor</StyledText>
            <StyledNumberInput
              type="number"
              value={options.ftFloor}
              onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, ftFloor: Number(e.target.value) }))}
              step="0.1"
            />
          </StyledOption>
        </StyledOptionAnimation>
      )}
    </StyledInputForm>
  );
};

export default GrowthInput;

const StyledInputForm = styled.div`
  width: 100%;
  display: flex;
`;
