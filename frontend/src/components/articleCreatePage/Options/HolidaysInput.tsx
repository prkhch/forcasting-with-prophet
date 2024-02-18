import React, { useState } from "react";
import { styled } from "styled-components";
import StyledOption from "styles/articleDetailPage/StyledOption";
import StyledOptionRow from "styles/articleDetailPage/StyledOptionRow";
import StyledOptionValue from "styles/articleDetailPage/StyledOptionValue";
import { StyledUl, StyledLi, StyledSelect } from "styles/common/StyledDropDown";
import StyledLabel from "styles/common/StyledLabel";
import StyledNumberInput from "styles/common/StyledNumberInput";
import StyledRowLayout from "styles/common/StyledRowLayout";
import StyledText from "styles/common/StyledText";
import { ProphetOptions } from "types/ProphetOptions";
import { COUNTRY } from "constants/COUNTRY";

const HolidaysInput = ({
  options,
  setOptions,
}: {
  options: ProphetOptions;
  setOptions: React.Dispatch<React.SetStateAction<ProphetOptions>>;
}) => {
  const [visible, setVisible] = useState(false);

  const [selectName, setSelectName] = useState("- - -");

  const handleCountryChange = (name: string, code: string) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      holidays: code,
    }));
    setSelectName(name);
  };

  return (
    <StyledInputForm>
      <StyledOptionRow>
        <StyledOption>
          <StyledText>Holidays</StyledText>
          <StyledSelect onClick={() => setVisible(!visible)}>
            {selectName}
            <img src="icons/dropdown_arrow.svg" alt="" />
          </StyledSelect>
          {visible && (
            <StyledUl>
              {Object.entries(COUNTRY).map(([name, code]) => (
                <StyledLi
                  key={name}
                  onClick={() => {
                    handleCountryChange(name, code);
                    setVisible(false);
                  }}
                >
                  {name}
                </StyledLi>
              ))}
            </StyledUl>
          )}
        </StyledOption>

        {options.holidays != "none" && (
          <StyledOption>
            <StyledText>Holiday Prior Scale</StyledText>
            <StyledNumberInput
              type="number"
              value={options.holidayScale}
              onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, holidayScale: Number(e.target.value) }))}
              step="0.1"
            />
          </StyledOption>
        )}
      </StyledOptionRow>
    </StyledInputForm>
  );
};

export default HolidaysInput;

const StyledInputForm = styled.div`
  width: 100%;
`;
