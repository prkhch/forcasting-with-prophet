import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Article } from "types/Article";
import axios from "axios";
import MoreButton from "../MoreButton";
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

const CategotyView = ({ name, id }: { name: string; id: string }) => {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const ApiGetArticleList = (pageNumber: number) => {
    setIsLoading(true);
    axios
      .get(
        `/api/spring/articles?page=${pageNumber}&size=3&sort=id,desc&categoryId=${id}`
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

  return (
    <StyledCategoryContainer>
      <StyledLabelContainer>
        <StyledCategoryLabel>{name}</StyledCategoryLabel>
        <MoreButton
          func={() => {
            navigate(`/category/${name}`, { state: { id: id, name: name } });
          }}
        />
      </StyledLabelContainer>
      <StyledAllArticles>
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
      </StyledAllArticles>
    </StyledCategoryContainer>
  );
};

export default CategotyView;
