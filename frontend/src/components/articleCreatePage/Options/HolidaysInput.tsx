import React, { useState } from "react";
import { COUNTRY } from "constants/COUNTRY";
import { ProphetOptions } from "types/ProphetOptions";
import { styled } from "styled-components";
import { StyledOptionRow, StyledOption } from "styles/common/StyledOption";
import { StyledUl, StyledLi, StyledSelect } from "styles/common/StyledDropDown";
import { StyledNumberInput } from "styles/common/StyledInput";
import { StyledText } from "styles/common/StyledText";

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
