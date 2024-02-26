import { useNavigate } from "react-router-dom";
import { StyledButton, StyledFirstText, StyledSecondText } from "styles/mainPage/StyledText";
import { StyledContainer } from "styles/mainPage/StyledContainer";
import { StyledImage1, StyledImage2, StyledImage3, StyledImage4, StyledLogo } from "styles/mainPage/StyledImage";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <StyledFirstText>Forcasting with</StyledFirstText>
      <StyledSecondText>Prophet</StyledSecondText>
      <StyledButton onClick={() => navigate("/home")}>Go</StyledButton>
      <StyledLogo src="logo.png" alt="logo" />
      <StyledImage1 src="main/excel.png" alt="img1" />
      <StyledImage2 src="main/option.png" alt="img2" />
      <StyledImage3 src="main/graph2.jpeg" alt="img3" />
      <StyledImage4 src="main/graph1.png" alt="img4" />
    </StyledContainer>
  );
};

export default MainPage;
