import StyledColLayout from "styles/common/StyledColLayout";
import StyledLabel from "styles/common/StyledLabel";
import { useLocation } from "react-router-dom";
import StyledCategoryText from "styles/listPage/StyledText";
import CategoryArticles from "components/listPage/CategoryArticles";
import AllArticles from "components/listPage/AllArticles";

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
