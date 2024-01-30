import StyledColLayout from "styles/StyledColLayout";
import Articles from "components/homePage/Articles";
import PlusButton from "components/homePage/PlusButton";

const HomePage = () => {
  return (
    <StyledColLayout>
      <PlusButton />
      <Articles />
    </StyledColLayout>
  );
};

export default HomePage;
