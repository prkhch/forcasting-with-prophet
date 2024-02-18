import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Article } from "types/Article";
import StyledAllAritcles from "styles/homePage/StyledAllAritcles";
import StyledArticle from "styles/homePage/StyledArticle";
import StyledContent from "styles/homePage/StyledContent";
import StyledTitle from "styles/homePage/StyledTitle";
import { StyledCategoryContainer, StyledColContainer, StyledContainer } from "styles/homePage/StyledContainer";
import { StyledCategoryLabel } from "styles/homePage/StyledLabel";
import AllView from "./category/AllView";
import SocialView from "./category/SocialView";
import ScienceView from "./category/ScienceView";
import FinanceView from "./category/FinanceView";
import ResourceView from "./category/ResourceView";
import HealthView from "./category/HealthView";
import NatureView from "./category/NatureView";

const Home = () => {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const ApiGetArticleList = (pageNumber: number) => {
    axios
      .get(`/api/articles?page=${pageNumber}&size=6&sort=id,desc`)
      .then((res) => {
        console.log(res.data);
        setArticleList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ApiGetArticleList(pageNumber);
    console.log(pageNumber);
  }, [pageNumber]);

  return (
    <StyledContainer>
      <StyledColContainer>
        <AllView />
      </StyledColContainer>

      <StyledColContainer>
        <SocialView />
        <ScienceView />
        <HealthView />
      </StyledColContainer>

      <StyledColContainer>
        <FinanceView />
        <ResourceView />
        <NatureView />
      </StyledColContainer>
    </StyledContainer>
  );
};

export default Home;
