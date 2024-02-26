import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import handleFormatDate from "utils/handleFormatDate";
import { ProphetOptions } from "types/ProphetOptions";
import { StyledOptionRow, StyledOption } from "styles/common/StyledOption";
import { StyledNumberInput, StyledDateInput } from "styles/common/StyledInput";
import { StyledText } from "styles/common/StyledText";
import { StyledDate } from "styles/common/StyledLabel";

const ChangePointsInput = ({
  options,
  setOptions,
}: {
  options: ProphetOptions;
  setOptions: React.Dispatch<React.SetStateAction<ProphetOptions>>;
}) => {
  const [date, setDate] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && date.length == 10) {
      handleAddDate();
      e.preventDefault();
    }
  };

  const handleAddDate = () => {
    if (date.length === 10) {
      setOptions((prevOptions) => {
        const newCpList = [...prevOptions.cpList, date];
        const uniqueCpList = Array.from(new Set(newCpList));
        uniqueCpList.sort((a, b) => a.localeCompare(b));

        return {
          ...prevOptions,
          cpList: uniqueCpList,
        };
      });
      setDate("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = handleFormatDate(e.target.value);
    setDate(formattedValue);
  };

  const handleDeleteCp = (idx: number) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      cpList: options.cpList.filter((key, filterIdx) => idx !== filterIdx),
    }));
  };

  return (
    <StyledInputForm>
      <StyledOptionRow>
        <StyledOption>
          <StyledOptionRow>
            <StyledText>Changepoints</StyledText>
            <StyledCaption>yyyy-mm-dd</StyledCaption>
          </StyledOptionRow>
          <StyledOptionRow>
            <StyledDateInput onChange={handleChange} type="text" value={date} onKeyDown={handleKeyDown} />
            <StyledlButton onMouseDown={handleAddDate}>+</StyledlButton>
          </StyledOptionRow>
        </StyledOption>
      </StyledOptionRow>

      <StyledOptionRow>
        {options.cpList.map((cp, idx) => (
          <StyledDate key={idx} onMouseDown={() => handleDeleteCp(idx)}>
            {cp}
          </StyledDate>
        ))}
      </StyledOptionRow>

      {options.cpList.length > 0 && (
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
      )}
    </StyledInputForm>
  );
};

export default ChangePointsInput;

const StyledInputForm = styled.div`
  width: 100%;
`;

const StyledlButton = styled.button`
  margin: 0 0 0 1rem;
  background-color: #2f70af;
  border-radius: 4px;
  padding: 0.5rem;
  font-family: "SuiteBold", sans-serif;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #00457e;
  }
`;

const StyledCaption = styled.div`
  font-family: "SuiteRegular", sans-serif;
  font-size: 12px;
  color: #b9b9b9;
  margin: 0.7rem 0 0 0.5rem;
`;
