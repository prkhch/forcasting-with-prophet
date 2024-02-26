import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StyledHeaderText from "styles/header/StyledHeaderText";
import StyledHeader from "styles/header/StyledHeader";

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
  });

  return (
    <StyledHeader>
      <div>
        <StyledHeaderText onClick={() => navigate("/home")}>Forcasting with Prophet</StyledHeaderText>
      </div>
      {/* <div>
      </div> */}
    </StyledHeader>
  );
};

export default Header;
