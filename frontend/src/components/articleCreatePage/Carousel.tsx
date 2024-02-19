import React, { useEffect, useState } from "react";
import RightButton from "components/homePage/RightButton";
import { Charts } from "types/Charts";
import LeftButton from "components/homePage/LeftButton";
import StyledImage from "styles/articleDetailPage/StyledImage";
import { styled } from "styled-components";
import DisabledRightButton from "components/homePage/DisabledRightButton";
import DisabledLeftButton from "components/homePage/DisabledLeftButton";
import StyledColLayout from "styles/common/StyledColLayout";
import StyledRowLayout from "styles/common/StyledRowLayout";
import StyledHeaderText from "styles/common/StyledHeaderText";
import { StyledIndicator } from "styles/common/StyledIndicator";
import { StyledLabel } from "styles/common/StyledLabel";

const Carousel = ({ chartsObj }: { chartsObj: Charts }) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [colName, setColName] = useState<string[]>([]);
  useEffect(() => {
    const newImageList: string[] = [];
    const newColName: string[] = [];
    Object.values(chartsObj).forEach((charts) => {
      charts.forEach((chart) => {
        newImageList.push(chart);
      });
    });
    Object.keys(chartsObj).forEach((columnName) => {
      newColName.push(columnName);
    });
    setColName(newColName);
    setImageList(newImageList);
  }, [chartsObj]);

  const [pageNumber, setPageNumber] = useState(0);

  return (
    <StyledColLayout>
      <StyledLabel>{colName[pageNumber / 2]}</StyledLabel>

      <StyledContainer>
        {pageNumber > 0 && (
          <LeftButton
            func={() => {
              setPageNumber(pageNumber - 2);
            }}
          />
        )}
        {pageNumber == 0 && <DisabledLeftButton />}

        {imageList.length > 0 && (
          <StyledRowLayout>
            <StyledImage src={`data:image/jpeg;base64,${imageList[pageNumber]}`} alt="chartImage" />
            <StyledImage src={`data:image/jpeg;base64,${imageList[pageNumber + 1]}`} alt="component" />
          </StyledRowLayout>
        )}

        {pageNumber < imageList.length - 2 && (
          <RightButton
            func={() => {
              setPageNumber(pageNumber + 2);
            }}
          />
        )}
        {pageNumber == imageList.length - 2 && <DisabledRightButton />}
      </StyledContainer>

      <StyledRowLayout>
        {Array.from({ length: imageList.length / 2 }, (_, i) => (
          <StyledIndicator key={i} onClick={() => setPageNumber(i * 2)} selected={pageNumber === i * 2}>
            ●
          </StyledIndicator>
        ))}
      </StyledRowLayout>
    </StyledColLayout>
  );
};

export default Carousel;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
