import React from "react";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import { Outlet } from "react-router-dom";
import StyledBackGround from "styles/StyledBackGround";

const MainLayout = () => {
  return (
    <StyledBackGround>
      <Header />
      <Outlet />
      <Footer />
    </StyledBackGround>
  );
};

export default MainLayout;
