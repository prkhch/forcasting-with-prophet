import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { DataItem } from "types/DataItem";
import useForamatDate from "hooks/useForamatDate";
import { ProphetOptions } from "types/ProphetOptions";
import { Charts } from "types/Charts";
import useBase64ToBlob from "hooks/useBase64ToBlob";
import StyledSmallButton from "styles/StyledSmallButton";
import StyledColLayout from "styles/StyledColLayout";
import Carousel from "components/articleCreatePage/Carousel";
import Article from "components/articleCreatePage/Article";

const ArticleCreatePage = () => {
  return (
    <StyledColLayout>
      <Article />
    </StyledColLayout>
  );
};

export default ArticleCreatePage;
