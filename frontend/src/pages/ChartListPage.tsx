import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "types/Article";

const ChartListPage = () => {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState<Article[]>([]);

  // getLst
  const ApiGetArtilceList = () => {
    axios
      .get("/api/articles", {})
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
      <div>리스트 페이지</div>

      <div>
        {articleList.map((article, idx) => (
          <div key={idx} onClick={() => navigate(`article/${article.id}`)}>
            <div>{article.id}</div>
            <div>{article.title}</div>
            <div>{article.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartListPage;
