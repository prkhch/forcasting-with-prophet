import React from "react";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import { Outlet } from "react-router-dom";
import { StyledBackGround, StyledContent } from "styles/common/StyledLayout";

const MainLayout = () => {
  return (
    <StyledBackGround>
      <Header />
      <StyledContent>
        <Outlet />
      </StyledContent>
      <Footer />
    </StyledBackGround>
  );
};

export default MainLayout;
