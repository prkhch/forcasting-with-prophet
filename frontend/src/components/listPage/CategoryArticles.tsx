import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Article } from "types/Article";
import LeftButton from "components/common/LeftButton";
import RightButton from "components/common/RightButton";
import DisabledLeftButton from "components/common/DisabledLeftButton";
import DisabledRightButton from "components/common/DisabledRightButton";
import { useRecoilState } from "recoil";
import { loadingState } from "recoils/atoms/loadingState";

import {
  StyledArticles,
  StyledArticle,
  StyledTitle,
  StyledContent,
} from "styles/homePage/StyledArticles";
import { StyledRowLayout } from "styles/common/StyledLayout";

const CategoryArticles = ({ name, id }: { name: string; id: string }) => {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const ApiGetArticleList = (pageNumber: number) => {
    setIsLoading(true);
    axios
      .get(
        `/api/spring/articles?page=${pageNumber}&size=10&sort=id,desc&categoryId=${id}`
      )
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

  const handlePage = (num: number) => {
    setPageNumber(pageNumber + num);
  };

  return (
    <StyledArticles>
      {articleList.map((article, idx) => (
        <StyledArticle
          key={idx}
          onClick={() =>
            navigate(`/article/${article.id}`, { state: { id: article.id } })
          }
        >
          <StyledTitle>{article.title}</StyledTitle>
          <StyledContent>{article.content}</StyledContent>
        </StyledArticle>
      ))}
      <StyledRowLayout>
        <div id="pageButton">
          {pageNumber > 0 && <LeftButton func={() => handlePage(-1)} />}
          {pageNumber == 0 && <DisabledLeftButton />}
          {pageNumber < totalPages - 1 && (
            <RightButton func={() => handlePage(1)} />
          )}
          {pageNumber == totalPages - 1 && <DisabledRightButton />}
        </div>
      </StyledRowLayout>
    </StyledArticles>
  );
};

export default CategoryArticles;
