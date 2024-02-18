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
import { SEASON } from "constants/SEASON";

const WeekInput = ({
  options,
  setOptions,
}: {
  options: ProphetOptions;
  setOptions: React.Dispatch<React.SetStateAction<ProphetOptions>>;
}) => {
  const [visible, setVisible] = useState(false);
  const [selectName, setSelectName] = useState("Auto");

  // const handleGrowthChange = (value: string) => {
  //   setOptions((prevOptions) => ({
  //     ...prevOptions,
  //     growth: value,
  //   }));
  // };

  return (
    <StyledInputForm>
      <StyledText>Weekly Seasonality</StyledText>
      <StyledOptionRow>
        <StyledOption>
          <StyledSelect onClick={() => setVisible(!visible)}>
            {selectName}
            <img src="icons/dropdown_arrow.svg" alt="" />
          </StyledSelect>
          {visible && (
            <StyledUl>
              {Object.entries(SEASON).map(([name, value]) => (
                <StyledLi
                  key={name}
                  onClick={() => {
                    setVisible(false);
                    setSelectName(name);
                    setOptions((prev) => ({ ...prev, weeklyScale: value }));
                  }}
                >
                  {name}
                </StyledLi>
              ))}
            </StyledUl>
          )}
        </StyledOption>

        <StyledOption>
          {selectName == "True" && typeof options.weeklyScale == "number" && (
            <StyledNumberInput
              type="number"
              value={options.weeklyScale}
              onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, weeklyScale: Number(e.target.value) }))}
            />
          )}
        </StyledOption>
      </StyledOptionRow>
    </StyledInputForm>
  );
};

export default WeekInput;

const StyledInputForm = styled.div`
  width: 100%;
`;
