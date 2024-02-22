import Article from "components/articleDetailPage/Article";
import { useLocation } from "react-router-dom";
import { StyledColLayout } from "styles/common/StyledLayout";

const ArticleDetailPage = () => {
  const location = useLocation();
  const { id } = location.state;

  return (
    <StyledColLayout>
      <Article id={id} />
    </StyledColLayout>
  );
};

export default ArticleDetailPage;
