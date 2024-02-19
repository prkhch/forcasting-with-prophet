import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StyledHeaderText from "styles/header/StyledHeaderText";
import StyledHeader from "styles/header/StyledHeader";

const Header = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = "http://localhost:8080/login/oauth2/code/google";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${redirectUri}&client_id=${clientId}`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
  });

  return (
    <StyledHeader>
      <div>
        <StyledHeaderText onClick={() => navigate("/")}>Forcasting with Prophet</StyledHeaderText>
      </div>
      {/* <div>
        <StyledHeaderText onClick={handleGoogleLogin}>Login</StyledHeaderText>
      </div> */}
    </StyledHeader>
  );
};

export default Header;
