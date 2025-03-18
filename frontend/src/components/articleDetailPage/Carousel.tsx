import React, { useEffect, useState } from "react";
import axios from "axios";
import { Charts } from "types/Charts";
import { FileResponse } from "types/FileResponse";
import { useRecoilState } from "recoil";
import RightButton from "components/common/RightButton";
import LeftButton from "components/common/LeftButton";
import DisabledRightButton from "components/common/DisabledRightButton";
import DisabledLeftButton from "components/common/DisabledLeftButton";
import { loadingState } from "recoils/atoms/loadingState";

import { styled } from "styled-components";
import { StyledColLayout, StyledRowLayout } from "styles/common/StyledLayout";
import { StyledIndicator, StyledImage } from "styles/common/StyledCarousel";
import { StyledLabel } from "styles/common/StyledLabel";
import ImageModal from "components/common/ImageModal";

const Carousel = ({ fileList }: { fileList: FileResponse[] }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageModal, setImageModal] = useState(false);
  const [selectImgUrl, setSelectImageUrl] = useState("");

  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const downloadFile = (fileId: number): Promise<string> => {
    setIsLoading(true);
    return axios
      .get(`/api/spring/files/download/${fileId}`, {
        responseType: "blob",
      })
      .then((res) => {
        setIsLoading(false);
        return URL.createObjectURL(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
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

  const handleImageModal = (url: string) => {
    setSelectImageUrl(url);
    setImageModal(true);
  };

  return (
    <StyledColLayout>
      {fileList.length > 0 && (
        <StyledLabel>{fileList[pageNumber].fileName}</StyledLabel>
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

        {imageUrls.length > 0 && (
          <StyledRowLayout>
            {/* <StyledImage src={`/api/spring/files/download/${fileList[pageNumber].id}`} alt={fileList[pageNumber].fileName} />
            <StyledImage
              src={`/api/spring/files/download/${fileList[pageNumber + 1].id}`}
              alt={fileList[pageNumber].fileName}
            /> */}
            <StyledImage
              src={imageUrls[pageNumber - 1]}
              alt={`Image ${pageNumber - 1}`}
              onClick={() => handleImageModal(imageUrls[pageNumber - 1])}
            />
            <StyledImage
              src={imageUrls[pageNumber]}
              alt={`Image ${pageNumber}`}
              onClick={() => handleImageModal(imageUrls[pageNumber])}
            />
          </StyledRowLayout>
        )}
        {imageModal && (
          <ImageModal imageUrl={selectImgUrl} setImageModal={setImageModal} />
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
