import React, { useEffect, useState } from "react";
import { Charts } from "types/Charts";
import { styled } from "styled-components";
import RightButton from "components/common/RightButton";
import LeftButton from "components/common/LeftButton";
import DisabledRightButton from "components/common/DisabledRightButton";
import DisabledLeftButton from "components/common/DisabledLeftButton";
import { StyledColLayout, StyledRowLayout } from "styles/common/StyledLayout";
import { StyledIndicator, StyledImage } from "styles/common/StyledCarousel";
import { StyledLabel } from "styles/common/StyledLabel";
import ImageModal from "components/common/ImageModal";

const Carousel = ({ chartsObj }: { chartsObj: Charts }) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [colName, setColName] = useState<string[]>([]);
  const [imageModal, setImageModal] = useState(false);
  const [selectImgUrl, setSelectImageUrl] = useState("");

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

  const handleImageModal = (url: string) => {
    setSelectImageUrl(url);
    setImageModal(true);
  };

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
            <StyledImage
              src={`data:image/jpeg;base64,${imageList[pageNumber]}`}
              alt="chartImage"
              onClick={() => handleImageModal(`data:image/jpeg;base64,${imageList[pageNumber]}`)}
            />
            <StyledImage
              src={`data:image/jpeg;base64,${imageList[pageNumber + 1]}`}
              alt="component"
              onClick={() => handleImageModal(`data:image/jpeg;base64,${imageList[pageNumber + 1]}`)}
            />
          </StyledRowLayout>
        )}
        {imageModal && <ImageModal imageUrl={selectImgUrl} setImageModal={setImageModal} />}

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
