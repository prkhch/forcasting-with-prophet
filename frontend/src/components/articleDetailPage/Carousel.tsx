import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FileResponse } from "types/FileResponse";
import StyledCarousel from "styles/common/StyledCarousel";
import StyledColLayout from "styles/common/StyledColLayout";
import StyledImage from "styles/articleDetailPage/StyledImage";

const Carousel = ({ fileList }: { fileList: FileResponse[] }) => {
  return {
    /* <Slider {...settings}>
        {fileList.map(
          (file, idx) =>
            idx > 0 && (
              <div key={idx}>
                <StyledColLayout>{file.fileName}</StyledColLayout>
                <StyledImage src={`/api/files/download/${file.id}`} alt={file.fileName} />
              </div>
            )
        )}
      </Slider> */
  };
};

export default Carousel;
