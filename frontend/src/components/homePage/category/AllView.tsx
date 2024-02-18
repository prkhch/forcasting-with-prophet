import StyledAllAritcles from "styles/homePage/StyledAllAritcles";
import StyledArticle from "styles/homePage/StyledArticle";
import StyledTitle from "styles/homePage/StyledTitle";
import StyledContent from "styles/homePage/StyledContent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Article } from "types/Article";
import axios from "axios";
import { StyledCategoryContainer, StyledLabelContainer } from "styles/homePage/StyledContainer";
import { StyledCategoryLabel } from "styles/homePage/StyledLabel";
import React from "react";
import MoreButton from "../MoreButton";
import PlusButton from "../PlusButton";
import StyledColLayout from "styles/common/StyledColLayout";
import Loading from "components/common/Loading";

const AllView = () => {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const ApiGetArticleList = (pageNumber: number) => {
    setIsLoading(true);
    axios
      .get(`/api/articles?page=${pageNumber}&size=9&sort=id,desc`)
      .then((res) => {
        setArticleList(res.data.content);
        setTotalPages(res.data.totalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    ApiGetArticleList(pageNumber);
  }, [pageNumber]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <StyledCategoryContainer>
          <StyledLabelContainer>
            <StyledCategoryLabel>All</StyledCategoryLabel>
            <MoreButton
              func={() => {
                navigate(`category/all`, { state: { id: 0, name: "All" } });
              }}
            />
          </StyledLabelContainer>
          <StyledAllAritcles>
            {articleList.map((article, idx) => (
              <StyledArticle key={idx} onClick={() => navigate(`article/${article.id}`, { state: { id: article.id } })}>
                <StyledTitle>{article.title}</StyledTitle>
                <StyledContent>{article.content}</StyledContent>
              </StyledArticle>
            ))}
            <StyledColLayout>
              <PlusButton />
            </StyledColLayout>
          </StyledAllAritcles>
        </StyledCategoryContainer>
      )}
    </>
  );
};

export default AllView;
