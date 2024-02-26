import { useEffect, useState } from "react";
import { ProphetOptions } from "types/ProphetOptions";
import HolidaysInput from "./HolidaysInput";
import GrowthInput from "./GrowthInput";
import PeriodInput from "./PeriodInput";
import YearInput from "./YearInput";
import WeekInput from "./WeekInput";
import SeasonalInput from "./SeasonalInput";
import ChangePointsInput from "./ChangePointsInput";

import { StyledOptions, StyledOptionRow } from "styles/common/StyledOption";
import { StyledText, StyledBoldText } from "styles/common/StyledText";
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
