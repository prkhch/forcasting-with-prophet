import { useEffect, useState } from "react";
import StyledOptionValue from "styles/articleDetailPage/StyledOptionValue";
import StyledOption from "styles/articleDetailPage/StyledOption";
import StyledOptions from "styles/articleDetailPage/StyledOptions";
import { ProphetOptions } from "types/ProphetOptions";
import StyledOptionKey from "styles/articleDetailPage/StyledOptionKey";
import StyledOptionRow from "styles/articleDetailPage/StyledOptionRow";
import StyledBoldText from "styles/common/StyledHeaderText";
import { COUNTRY } from "constants/COUNTRY";
import HolidaysInput from "./HolidaysInput";
import StyledLabel from "styles/common/StyledLabel";
import StyledText from "styles/common/StyledText";
import GrowthInput from "./GrowthInput";
import PeriodInput from "./PeriodInput";

const Options = ({
  optionsString,
  setOptionString,
}: {
  optionsString: string;
  setOptionString: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // 옵션
  const [options, setOptions] = useState<ProphetOptions>({
    growth: "logistic",
    dfCap: 6,
    dfFloor: 1.5,
    ftCap: 6,
    ftFloor: 1.5,
    cpScale: 0.5,
    cpList: [],
    cpThreshold: 0.01,
    periods: 365,
    holidays: "none",
    holidayScale: 10,
    yearlyScale: "auto",
    weeklyScale: "auto",
    seasonMode: "additive",
    seasonScale: 10,
  });

  useEffect(() => {
    const tmp = JSON.stringify(options);
    setOptionString(tmp);
  }, []);

  useEffect(() => {
    const tmp = JSON.stringify(options);
    setOptionString(tmp);
  }, [options]);

  useEffect(() => {
    try {
      const parsedOptions = JSON.parse(optionsString) as ProphetOptions;
      setOptions(parsedOptions);
    } catch (error) {}
  }, [optionsString]);

  return (
    <StyledOptions>
      <StyledLabel>Options</StyledLabel>
      <StyledOptionRow>
        <StyledOption>
          <StyledText>Changepoints</StyledText>
          <StyledOptionValue>{options?.cpList}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledText>Changepoint Prior Scale</StyledText> <StyledOptionValue>{options?.cpScale}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledText>Changepoint Threshold</StyledText>
          <StyledOptionValue>{options?.cpThreshold}</StyledOptionValue>
        </StyledOption>
      </StyledOptionRow>

      <GrowthInput options={options} setOptions={setOptions} />

      <PeriodInput options={options} setOptions={setOptions} />

      <HolidaysInput options={options} setOptions={setOptions} />

      <StyledOptionRow>
        <StyledOption>
          <StyledText>Season Mode</StyledText>
          <StyledOptionValue>{options?.seasonMode}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledText>Season Scale</StyledText>
          <StyledOptionValue>{options?.seasonScale}</StyledOptionValue>
        </StyledOption>
      </StyledOptionRow>
    </StyledOptions>
  );
};

export default Options;
