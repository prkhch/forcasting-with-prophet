import { useEffect, useState } from "react";
import { ProphetOptions } from "types/ProphetOptions";
import { StyledLabel, StyledDetailDate } from "styles/common/StyledLabel";
import { StyledOptions, StyledOptionRow, StyledOption, StyledOptionValue } from "styles/common/StyledOption";
import { StyledText } from "styles/common/StyledText";

const Options = ({ optionsString }: { optionsString: string }) => {
  const [options, setOptions] = useState<ProphetOptions>();

  useEffect(() => {
    try {
      const parsedOptions = JSON.parse(optionsString) as ProphetOptions;
      setOptions(parsedOptions);
    } catch (error) {}
  }, [optionsString]);

  return (
    <StyledOptions>
      <StyledLabel>Options</StyledLabel>

      {options?.cpList && options?.cpList.length > 0 && (
        <StyledOptionRow>
          <StyledOption>
            <StyledText>changepoints</StyledText>
            <StyledOptionValue>
              <StyledOptionRow>
                {options?.cpList.map((item, idx) => (
                  <StyledDetailDate key={idx}>{item}</StyledDetailDate>
                ))}
              </StyledOptionRow>
            </StyledOptionValue>
          </StyledOption>
        </StyledOptionRow>
      )}

      {options?.cpList && options?.cpList.length > 0 && (
        <StyledOptionRow>
          <StyledOption>
            <StyledText>changepoint_prior_scale</StyledText> <StyledOptionValue>{options?.cpScale}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledText>changepoint_threshold</StyledText>
            <StyledOptionValue>{options?.cpThreshold}</StyledOptionValue>
          </StyledOption>{" "}
        </StyledOptionRow>
      )}

      {options?.growth != "logistic" && (
        <StyledOptionRow>
          <StyledOption>
            <StyledText>growth</StyledText>
            <StyledOptionValue>{options?.growth}</StyledOptionValue>
          </StyledOption>
        </StyledOptionRow>
      )}
      {options?.growth == "logistic" && (
        <StyledOptionRow>
          <StyledOption>
            <StyledText>growth</StyledText>
            <StyledOptionValue>{options?.growth}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledText>dataframe_cap</StyledText>
            <StyledOptionValue>{options?.dfCap}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledText>dataframe_floor</StyledText>
            <StyledOptionValue>{options?.dfFloor}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledText>future_cap</StyledText>
            <StyledOptionValue>{options?.ftCap}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledText>future_floor</StyledText>
            <StyledOptionValue>{options?.ftFloor}</StyledOptionValue>
          </StyledOption>
        </StyledOptionRow>
      )}

      <StyledOptionRow>
        <StyledOption>
          <StyledText>periods</StyledText>
          <StyledOptionValue>{options?.periods}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledText>yearly_scale</StyledText>
          <StyledOptionValue>{options?.yearlyScale}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledText>weekly_scale</StyledText>
          <StyledOptionValue>{options?.weeklyScale}</StyledOptionValue>
        </StyledOption>
      </StyledOptionRow>

      <StyledOptionRow>
        <StyledOption>
          <StyledText>holidays</StyledText>
          <StyledOptionValue>{options?.holidays}</StyledOptionValue>
        </StyledOption>
        {options?.holidays != "none" && (
          <StyledOption>
            <StyledText>holiday_scale</StyledText>
            <StyledOptionValue>{options?.holidayScale}</StyledOptionValue>
          </StyledOption>
        )}
      </StyledOptionRow>

      <StyledOptionRow>
        <StyledOption>
          <StyledText>season_mode</StyledText>
          <StyledOptionValue>{options?.seasonMode}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledText>season_scale</StyledText>
          <StyledOptionValue>{options?.seasonScale}</StyledOptionValue>
        </StyledOption>
      </StyledOptionRow>
      <hr />
    </StyledOptions>
  );
};

export default Options;
