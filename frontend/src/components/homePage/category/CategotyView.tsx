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
import MoreButton from "../MoreButton";

const CategotyView = ({ name, id }: { name: string; id: string }) => {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const ApiGetArticleList = (pageNumber: number) => {
    axios
      .get(`/api/articles?page=${pageNumber}&size=3&sort=id,desc&categoryId=${id}`)
      .then((res) => {
        setArticleList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {});
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
            navigate(`category/${name}`, { state: { id: id, name: name } });
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
      </StyledAllAritcles>
    </StyledCategoryContainer>
  );
};

export default CategotyView;
