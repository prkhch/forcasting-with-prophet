import React from "react";
import { useNavigate } from "react-router-dom";
import StyledFooter from "styles/StyledFooter";
import StyledFooterLink from "styles/StyledFooterLink";
import StyledFooterText from "styles/StyledFooterText";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <StyledFooter>
      <StyledFooterText>shjc4623@gmail.com</StyledFooterText>
      <StyledFooterText>|</StyledFooterText>
      <StyledFooterLink href="https://facebook.github.io/prophet/" target="_blank" rel="noopener noreferrer">
        Prophet
      </StyledFooterLink>
    </StyledFooter>
  );
};

export default Footer;
