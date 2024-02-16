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
import { FileResponse } from "types/FileResponse";

const Carousel = ({ fileList }: { fileList: FileResponse[] }) => {
  const [pageNumber, setPageNumber] = useState(1);
  console.log(fileList);

  return (
    <StyledColLayout>
      {fileList.length > 0 && <StyledHeaderText>{fileList[pageNumber].fileName}</StyledHeaderText>}

      <StyledContainer>
        {pageNumber > 1 && (
          <LeftButton
            func={() => {
              setPageNumber(pageNumber - 2);
            }}
          />
        )}
        {pageNumber == 1 && <DisabledLeftButton />}

        {fileList.length > 0 && (
          <StyledRowLayout>
            <StyledImage src={`/api/files/download/${fileList[pageNumber].id}`} alt={fileList[pageNumber].fileName} />
            <StyledImage
              src={`/api/files/download/${fileList[pageNumber + 1].id}`}
              alt={fileList[pageNumber].fileName}
            />
          </StyledRowLayout>
        )}

        {pageNumber < fileList.length - 2 && (
          <RightButton
            func={() => {
              setPageNumber(pageNumber + 2);
            }}
          />
        )}
        {pageNumber == fileList.length - 2 && <DisabledRightButton />}
      </StyledContainer>
      <StyledRowLayout>
        {Array.from({ length: fileList.length / 2 }, (_, i) => (
          <StyledIndicator key={i} onClick={() => setPageNumber(i * 2 + 1)} selected={pageNumber === i * 2 + 1}>
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
