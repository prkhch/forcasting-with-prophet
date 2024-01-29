import React from "react";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

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

const StyledBackGround = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
`;
