import { useLocation } from "react-router-dom";
import AllArticles from "components/listPage/AllArticles";
import CategoryArticles from "components/listPage/CategoryArticles";
import { StyledCategoryText } from "styles/common/StyledText";
import { StyledColLayout } from "styles/common/StyledLayout";

const ListPage = () => {
  const location = useLocation();
  const { name, id } = location.state;

  return (
    <StyledColLayout>
      <StyledCategoryText>{name}</StyledCategoryText>
      {id != "0" && <CategoryArticles name={name} id={id} />}
      {id == "0" && <AllArticles name={name} />}
    </StyledColLayout>
  );
};

export default ListPage;
