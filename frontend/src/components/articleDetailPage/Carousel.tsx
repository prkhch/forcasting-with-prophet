import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FileResponse } from "types/FileResponse";
import StyledCarousel from "styles/articleDetailPage/StyledCarousel";
import StyledRowLayout from "styles/StyledRowLayout";
import StyledColLayout from "styles/StyledColLayout";
import StyledImage from "styles/articleDetailPage/StyledImage";

const Carousel = ({ fileList }: { fileList: FileResponse[] }) => {
  const settings = {
    dots: true, // 슬라이드 하단에 점 표시
    arrows: true,
    infinite: false, // 무한 순환
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 슬라이드 스크롤 수
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
