import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StyledCarousel from "styles/common/StyledCarousel";
import StyledImage from "styles/articleDetailPage/StyledImage";
import { Charts } from "types/Charts";

const Carousel = ({ chartsObj }: { chartsObj: Charts }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [imageList, setImageList] = useState<string[]>([]);
  useEffect(() => {
    const newImageList: string[] = [];
    Object.values(chartsObj).forEach((charts) => {
      charts.forEach((chart) => {
        newImageList.push(chart);
      });
    });
    setImageList(newImageList);
    console.log(newImageList);
  }, [chartsObj]);

  return (
    <StyledCarousel>
      <Slider {...settings}>
        {imageList.map((chart, chartIdx) => (
          <StyledImage src={`data:image/jpeg;base64,${chart}`} alt={`${chartIdx}`} key={chartIdx} />
        ))}
      </Slider>
    </StyledCarousel>
  );
};

export default Carousel;
