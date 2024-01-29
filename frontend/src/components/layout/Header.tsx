import React from "react";
import { useNavigate } from "react-router-dom";
import StyledHeaderText from "styles/StyledHeaderText";
import StyledHeader from "styles/StyledHeader";

const Header = () => {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <div>
        <StyledHeaderText onClick={() => navigate("/")}>FLAG</StyledHeaderText>
      </div>
      <div>
        <StyledHeaderText onClick={() => navigate("/login")}>Login</StyledHeaderText>
      </div>
    </StyledHeader>
  );
};

export default Header;
