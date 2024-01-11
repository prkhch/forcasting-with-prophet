import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import ChartCreatePage from "pages/ChartCreatePage";
import ChartDetailPage from "pages/ChartDetailPage";
import ChartListPage from "pages/ChartListPage";
import LoginPage from "pages/LoginPage";
import SignUpPage from "pages/SignUpPage";

const AppRoute = () => {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route index element={<ChartListPage />} />
          <Route path="/:id" element={<ChartDetailPage />} />
          <Route path="/create" element={<ChartCreatePage />} />
        </Route>
        {/* 404 */}
        <Route></Route>
      </Routes>
    </div>
  );
};

export default AppRoute;
