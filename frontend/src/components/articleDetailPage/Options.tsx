import { useEffect, useState } from "react";
import StyledOptionValue from "styles/articleDetailPage/StyledOptionValue";
import StyledOption from "styles/articleDetailPage/StyledOption";
import StyledOptions from "styles/articleDetailPage/StyledOptions";
import { ProphetOptions } from "types/ProphetOptions";
import StyledOptionKey from "styles/articleDetailPage/StyledOptionKey";
import StyledOptionRow from "styles/articleDetailPage/StyledOptionRow";
import StyledBoldText from "styles/StyledHeaderText";

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
      <StyledBoldText>Options</StyledBoldText>
      {options?.growth != "logistic" && (
        <StyledOptionRow>
          <StyledOption>
            <StyledOptionKey>growth :</StyledOptionKey>
            <StyledOptionValue>{options?.growth}</StyledOptionValue>
          </StyledOption>
        </StyledOptionRow>
      )}
      {options?.growth == "logistic" && (
        <StyledOptionRow>
          <StyledOption>
            <StyledOptionKey>growth :</StyledOptionKey>
            <StyledOptionValue>{options?.growth}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledOptionKey>dataframe_cap :</StyledOptionKey>
            <StyledOptionValue>{options?.dfCap}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledOptionKey>dataframe_floor :</StyledOptionKey>
            <StyledOptionValue>{options?.dfFloor}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledOptionKey>future_cap :</StyledOptionKey>
            <StyledOptionValue>{options?.ftCap}</StyledOptionValue>
          </StyledOption>
          <StyledOption>
            <StyledOptionKey>future_floor :</StyledOptionKey>
            <StyledOptionValue>{options?.ftFloor}</StyledOptionValue>
          </StyledOption>
        </StyledOptionRow>
      )}
      <StyledOptionRow>
        <StyledOption>
          <img src="icons/flag_small.svg" />
          <StyledOptionKey>changepoints :</StyledOptionKey>
          <StyledOptionValue>{options?.cpList}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledOptionKey>changepoint_prior_scale :</StyledOptionKey>{" "}
          <StyledOptionValue>{options?.cpScale}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledOptionKey>changepoint_threshold :</StyledOptionKey>
          <StyledOptionValue>{options?.cpThreshold}</StyledOptionValue>
        </StyledOption>
      </StyledOptionRow>
      <StyledOptionRow>
        <StyledOption>
          <StyledOptionKey>periods :</StyledOptionKey>
          <StyledOptionValue>{options?.periods}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledOptionKey>yearly_scale :</StyledOptionKey>
          <StyledOptionValue>{options?.yearlyScale}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledOptionKey>weekly_scale : </StyledOptionKey>
          <StyledOptionValue>{options?.weeklyScale}</StyledOptionValue>
        </StyledOption>
      </StyledOptionRow>
      <StyledOptionRow>
        <StyledOption>
          <StyledOptionKey>holidays : </StyledOptionKey>
          <StyledOptionValue>{options?.holidays}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledOptionKey>holiday_scale : </StyledOptionKey>
          <StyledOptionValue>{options?.holidayScale}</StyledOptionValue>
        </StyledOption>
      </StyledOptionRow>
      <StyledOptionRow>
        <StyledOption>
          <StyledOptionKey>season_mode : </StyledOptionKey>
          <StyledOptionValue>{options?.seasonMode}</StyledOptionValue>
        </StyledOption>
        <StyledOption>
          <StyledOptionKey>season_scale :</StyledOptionKey>
          <StyledOptionValue>{options?.seasonScale}</StyledOptionValue>
        </StyledOption>
      </StyledOptionRow>
    </StyledOptions>
  );
};

export default Options;
