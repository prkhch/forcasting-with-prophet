import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FileResponse } from "types/FileResponse";
import StyledCarousel from "styles/StyledCarousel";
import StyledRowLayout from "styles/StyledRowLayout";
import StyledColLayout from "styles/StyledColLayout";
import StyledImage from "styles/articleDetailPage/StyledImage";

const Carousel = ({ fileList }: { fileList: FileResponse[] }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <StyledCarousel>
      <Slider {...settings}>
        {fileList.map(
          (file, idx) =>
            idx > 0 && (
              <div key={idx}>
                <StyledColLayout>{file.fileName}</StyledColLayout>
                <StyledImage src={`/api/files/download/${file.id}`} alt={file.fileName} />
              </div>
            )
        )}
      </Slider>
    </StyledCarousel>
  );
};

export default Carousel;
