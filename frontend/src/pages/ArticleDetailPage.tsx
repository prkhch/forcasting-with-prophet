import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FileResponse } from "types/FileResponse";

const ArticleDetailPage = () => {
  const location = useLocation();
  const { id } = location.state;

  const [fileList, setFileList] = useState<FileResponse[]>([]);

  // getArticle
  const ApiGetArtilceDetail = () => {
    axios
      .get(`/api/articles/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getDataFile
  const ApiGetArtilceDataFilePath = () => {
    axios
      .get(`/api/datafile/${id}`)
      .then((res) => {
        console.log(res.data);
        setFileList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ApiDownload = (fileId: number, fileName: string) => {
    axios
      .get(`/api/files/download/${fileId}`, { responseType: "blob" })
      .then((res) => {
        // Blob 데이터로부터 URL을 생성합니다.
        const url = window.URL.createObjectURL(new Blob([res.data]));
        // 가상의 a 태그를 생성하고 다운로드 링크를 설정합니다.
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // 다운로드할 파일 이름을 설정합니다.
        document.body.appendChild(link);
        link.click(); // 클릭 이벤트를 발생시켜 다운로드를 시작합니다.
        document.body.removeChild(link); // a 태그를 제거합니다.
        window.URL.revokeObjectURL(url); // 생성된 URL을 정리합니다.
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ApiGetArtilceDetail();
    ApiGetArtilceDataFilePath();
  }, []);

  return (
    <div>
      <div>디테일페이지 {id}번</div>
      {fileList.map((file, idx) => (
        <div key={idx}>
          {idx === 0 ? (
            <a onClick={() => ApiDownload(file.id, file.fileName)}>{file.fileName}</a>
          ) : (
            <img src={`/api/files/download/${file.id}`} alt={file.fileName} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ArticleDetailPage;
