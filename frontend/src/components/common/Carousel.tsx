import React, { useEffect, useState } from "react";
import RightButton from "components/common/RightButton";
import LeftButton from "components/common/LeftButton";
import { styled } from "styled-components";
import DisabledRightButton from "components/common/DisabledRightButton";
import DisabledLeftButton from "components/common/DisabledLeftButton";
import { FileResponse } from "types/FileResponse";

import { StyledColLayout, StyledRowLayout } from "styles/common/StyledLayout";
import { StyledBoldText } from "styles/common/StyledText";
import { StyledIndicator, StyledImage } from "styles/common/StyledCarousel";

const Carousel = ({ fileList }: { fileList: FileResponse[] }) => {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <StyledColLayout>
      {fileList.length > 0 && (
        <StyledBoldText>{fileList[pageNumber].fileName}</StyledBoldText>
      )}

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
            <StyledImage
              src={`${process.env.REACT_APP_API_URL}/api/spring/files/download/${fileList[pageNumber].id}`}
              alt={fileList[pageNumber].fileName}
            />
            <StyledImage
              src={`${
                process.env.REACT_APP_API_URL
              }/api/spring/files/download/${fileList[pageNumber + 1].id}`}
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
          <StyledIndicator
            key={i}
            onClick={() => setPageNumber(i * 2 + 1)}
            selected={pageNumber === i * 2 + 1}
          >
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
