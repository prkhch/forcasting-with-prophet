import React, { useState } from "react";
import { styled } from "styled-components";
import StyledOption from "styles/articleDetailPage/StyledOption";
import StyledOptionRow from "styles/articleDetailPage/StyledOptionRow";
import StyledOptionValue from "styles/articleDetailPage/StyledOptionValue";
import { StyledUl, StyledLi, StyledSelect } from "styles/common/StyledDropDown";
import { StyledLabel } from "styles/common/StyledLabel";
import StyledNumberInput from "styles/common/StyledNumberInput";
import StyledRowLayout from "styles/common/StyledRowLayout";
import StyledText from "styles/common/StyledText";
import { ProphetOptions } from "types/ProphetOptions";
import { COUNTRY } from "constants/COUNTRY";

const SEASONALITY_MODE = ["additive", "multiplicative"];

const Seasonalnput = ({
  options,
  setOptions,
}: {
  options: ProphetOptions;
  setOptions: React.Dispatch<React.SetStateAction<ProphetOptions>>;
}) => {
  const [visible, setVisible] = useState(false);
  const [selectName, setSelectName] = useState(options.seasonMode);

  return (
    <StyledInputForm>
      <StyledOptionRow>
        <StyledOption>
          <StyledText>Seasonality Mode</StyledText>
          <StyledSelect onClick={() => setVisible(!visible)}>
            {selectName}
            <img src="icons/dropdown_arrow.svg" alt="" />
          </StyledSelect>

          {visible && (
            <StyledUl>
              {SEASONALITY_MODE.map((i, idx) => (
                <StyledLi
                  key={idx}
                  onClick={() => {
                    setOptions((prev) => ({ ...prev, seasonMode: i }));
                    setSelectName(i);
                    setVisible(false);
                  }}
                >
                  {i}
                </StyledLi>
              ))}
            </StyledUl>
          )}
        </StyledOption>

        <StyledOption>
          <StyledText>Seasonality Prior Scale</StyledText>
          <StyledNumberInput
            type="number"
            value={options.seasonScale}
            onChange={(e) => setOptions((prevOptions) => ({ ...prevOptions, seasonScale: Number(e.target.value) }))}
            step="0.1"
          />
        </StyledOption>
      </StyledOptionRow>
    </StyledInputForm>
  );
};

export default Seasonalnput;

const StyledInputForm = styled.div`
  width: 100%;
`;
