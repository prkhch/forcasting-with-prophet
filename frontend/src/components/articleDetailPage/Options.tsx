import { useEffect, useState } from "react";
import StyledOptionValue from "styles/articleDetailPage/StyledOptionValue";
import StyledOption from "styles/articleDetailPage/StyledOption";
import StyledOptions from "styles/articleDetailPage/StyledOptions";
import { ProphetOptions } from "types/ProphetOptions";
import StyledOptionKey from "styles/articleDetailPage/StyledOptionKey";
import StyledOptionRow from "styles/articleDetailPage/StyledOptionRow";
import StyledBoldText from "styles/common/StyledHeaderText";
import StyledLabel from "styles/common/StyledLabel";
import StyledText from "styles/common/StyledText";

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
            <StyledOptionValue>{options?.cpList}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledText>changepoint_prior_scale</StyledText> <StyledOptionValue>{options?.cpScale}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledText>changepoint_threshold</StyledText>
            <StyledOptionValue>{options?.cpThreshold}</StyledOptionValue>
          </StyledOption>
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
    </StyledOptions>
  );
};

export default Options;