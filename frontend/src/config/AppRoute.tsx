import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import ArticleCreatePage from "pages/ArticleCreatePage";
import ArticleDetailPage from "pages/ArticleDetailPage";
import HomePage from "pages/HomePage";
import ListPage from "pages/ListPage";
import MainPage from "pages/MainPage";

const AppRoute = () => {
  return (
    <div>
      <Routes>
        <Route index element={<MainPage />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="category/:category" element={<ListPage />} />
          <Route path="article/:id" element={<ArticleDetailPage />} />
          <Route path="/create" element={<ArticleCreatePage />} />
        </Route>
        {/* 404 */}
        <Route></Route>
      </Routes>
    </div>
  );
};

export default AppRoute;
