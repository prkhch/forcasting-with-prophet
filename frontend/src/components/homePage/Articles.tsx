import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Article } from "types/Article";
import StyledArticles from "styles/homePage/StyledArticles";
import StyledArticle from "styles/homePage/StyledArticle";
import StyledContent from "styles/homePage/StyledContent";
import StyledTitle from "styles/homePage/StyledTitle";
import StyledRowLayout from "styles/StyledRowLayout";
import LeftButton from "./LeftButton";
import RightButton from "./RightButton";
import DisabledLeftButton from "./DisabledLeftButton";
import DisabledRightButton from "./DisabledRightButton";

const Articles = () => {
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

  const handlePage = (num: number) => {
    setPageNumber(pageNumber + num);
  };

  return (
    <StyledArticles>
      {articleList.map((article, idx) => (
        <div key={idx}>
          <StyledArticle onClick={() => navigate(`${article.id}`, { state: { id: article.id } })}>
            <div>
              <StyledTitle>{article.title}</StyledTitle>
            </div>
            <div>
              <StyledContent>{article.content}</StyledContent>
            </div>
          </StyledArticle>
          <hr />
        </div>
      ))}
      <StyledRowLayout>
        <div id="pageButton">
          {pageNumber > 0 && <LeftButton func={() => handlePage(-1)} />}
          {pageNumber == 0 && <DisabledLeftButton />}
          {pageNumber < totalPages - 1 && <RightButton func={() => handlePage(1)} />}
          {pageNumber == totalPages - 1 && <DisabledRightButton />}
        </div>
      </StyledRowLayout>
    </StyledArticles>
  );
};

export default Articles;
