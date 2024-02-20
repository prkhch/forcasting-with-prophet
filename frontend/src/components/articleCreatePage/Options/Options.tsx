import { useEffect, useState } from "react";
import StyledOptionValue from "styles/articleDetailPage/StyledOptionValue";
import StyledOption from "styles/articleDetailPage/StyledOption";
import StyledOptions from "styles/articleDetailPage/StyledOptions";
import { ProphetOptions } from "types/ProphetOptions";
import StyledOptionKey from "styles/articleDetailPage/StyledOptionKey";
import StyledOptionRow from "styles/articleDetailPage/StyledOptionRow";
import StyledBoldText from "styles/common/StyledHeaderText";
import HolidaysInput from "./HolidaysInput";
import StyledText from "styles/common/StyledText";
import GrowthInput from "./GrowthInput";
import PeriodInput from "./PeriodInput";
import YearInput from "./YearInput";
import WeekInput from "./WeekInput";
import SeasonalInput from "./SeasonalInput";
import ChangePointsInput from "./ChangePointsInput";
import { StyledLabel } from "styles/common/StyledLabel";

const Options = ({
  optionsString,
  setOptionString,
}: {
  optionsString: string;
  setOptionString: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // 옵션
  const [options, setOptions] = useState<ProphetOptions>({
    growth: "linear",
    dfCap: 6,
    dfFloor: 1.5,
    ftCap: 6,
    ftFloor: 1.5,
    cpScale: 0.05,
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

  // 초기옵션
  useEffect(() => {
    const tmp = JSON.stringify(options);
    setOptionString(tmp);
  }, []);

  useEffect(() => {
    const tmp = JSON.stringify(options);
    setOptionString(tmp);
  }, [options]);

  useEffect(() => {
    console.log(optionsString);
  }, [optionsString]);

  return (
    <StyledOptions>
      <StyledLabel>Options</StyledLabel>

      <ChangePointsInput options={options} setOptions={setOptions} />

      <GrowthInput options={options} setOptions={setOptions} />

      <HolidaysInput options={options} setOptions={setOptions} />

      <StyledOptionRow>
        <WeekInput options={options} setOptions={setOptions} />
        <YearInput options={options} setOptions={setOptions} />
        <PeriodInput options={options} setOptions={setOptions} />
      </StyledOptionRow>

      <SeasonalInput options={options} setOptions={setOptions} />
    </StyledOptions>
  );
};

export default Options;
