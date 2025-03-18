import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Article } from "types/Article";
import MoreButton from "../MoreButton";
import PlusButton from "../PlusButton";
import Loading from "components/common/Loading";
import { useRecoilState } from "recoil";
import { loadingState } from "recoils/atoms/loadingState";

import {
  StyledAllArticles,
  StyledArticle,
  StyledTitle,
  StyledContent,
} from "styles/homePage/StyledArticles";
import {
  StyledCategoryContainer,
  StyledLabelContainer,
} from "styles/homePage/StyledContainer";
import { StyledCategoryLabel } from "styles/homePage/StyledLabel";
import { StyledColLayout } from "styles/common/StyledLayout";

const AllView = () => {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const ApiGetArticleList = (pageNumber: number) => {
    setIsLoading(true);
    axios
      .get(`/api/spring/articles?page=${pageNumber}&size=9&sort=id,desc`)
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
                navigate(`/category/all`, { state: { id: 0, name: "All" } });
              }}
            />
          </StyledLabelContainer>
          <StyledAllArticles>
            {articleList.map((article, idx) => (
              <StyledArticle
                key={idx}
                onClick={() =>
                  navigate(`/article/${article.id}`, {
                    state: { id: article.id },
                  })
                }
              >
                <StyledTitle>{article.title}</StyledTitle>
                <StyledContent>{article.content}</StyledContent>
              </StyledArticle>
            ))}
            <StyledColLayout>
              <PlusButton />
            </StyledColLayout>
          </StyledAllArticles>
        </StyledCategoryContainer>
      )}
    </>
  );
};

export default AllView;
