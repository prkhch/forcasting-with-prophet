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
      <StyledButton onClick={() => navigate("/home")}>➡</StyledButton>
    </StyledContainer>
  );
};

export default MainPage;
