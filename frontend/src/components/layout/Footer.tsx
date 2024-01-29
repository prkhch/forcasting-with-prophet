import React from "react";
import { useNavigate } from "react-router-dom";
import StyledFooter from "styles/footer/StyledFooter";
import StyledFooterLink from "styles/footer/StyledFooterLink";
import StyledFooterText from "styles/footer/StyledFooterText";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <StyledFooter>
      <StyledFooterText>@prkhch</StyledFooterText>
      <StyledFooterText>|</StyledFooterText>
      <StyledFooterText>shjc4623@gmail.com</StyledFooterText>
      <StyledFooterText>|</StyledFooterText>
      <StyledFooterLink href="https://facebook.github.io/prophet/" target="_blank" rel="noopener noreferrer">
        Prophet
      </StyledFooterLink>
    </StyledFooter>
  );
};

export default Footer;
