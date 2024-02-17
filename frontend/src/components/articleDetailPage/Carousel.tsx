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
import axios from "axios";
import StyledLabel from "styles/common/StyledLabel";

const Carousel = ({ fileList }: { fileList: FileResponse[] }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const downloadFile = (fileId: number): Promise<string> => {
    return axios
      .get(`/api/files/download/${fileId}`, {
        responseType: "blob",
      })
      .then((res) => {
        return URL.createObjectURL(res.data);
      })
      .catch((err) => {
        console.log(err);
        return "";
      });
  };

  useEffect(() => {
    async function fetchImages() {
      const downloadPromises = fileList.slice(pageNumber).map((file) => {
        return downloadFile(file.id);
      });
      const urls = await Promise.all(downloadPromises);
      setImageUrls(urls);
    }

    if (fileList.length > 0) {
      fetchImages();
    }
  }, [fileList]);

  return (
    <StyledColLayout>
      {fileList.length > 0 && <StyledLabel>{fileList[pageNumber].fileName}</StyledLabel>}

      <StyledContainer>
        {pageNumber > 1 && (
          <LeftButton
            func={() => {
              setPageNumber(pageNumber - 2);
            }}
          />
        )}
        {pageNumber == 1 && <DisabledLeftButton />}

        {imageUrls.length > 0 && (
          <StyledRowLayout>
            {/* <StyledImage src={`/api/files/download/${fileList[pageNumber].id}`} alt={fileList[pageNumber].fileName} />
            <StyledImage
              src={`/api/files/download/${fileList[pageNumber + 1].id}`}
              alt={fileList[pageNumber].fileName}
            /> */}
            <StyledImage src={imageUrls[pageNumber - 1]} alt={`Image ${pageNumber - 1}`} />
            <StyledImage src={imageUrls[pageNumber]} alt={`Image ${pageNumber}`} />
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
