import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Article } from "types/Article";

const Articles = () => {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState<Article[]>([]);

  const ApiGetArtilceList = () => {
    axios
      .get("/api/articles")
      .then((res) => {
        console.log(res.data);
        setArticleList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ApiGetArtilceList();
  }, []);

  return (
    <div>
      {articleList.map((article, idx) => (
        <div key={idx} onClick={() => navigate(`${article.id}`, { state: { id: article.id } })}>
          <div>{article.id}</div>
          <div>{article.title}</div>
          <div>{article.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Articles;
