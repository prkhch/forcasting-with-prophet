import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FileResponse } from "types/FileResponse";

const ArticleDetailPage = () => {
  const location = useLocation();
  const { id } = location.state;

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [prophetOptions, setProphetOptions] = useState();

  const [fileList, setFileList] = useState<FileResponse[]>([]);
  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState();
  const [fileId, setFileId] = useState();

  // getArticle
  const ApiGetArtilceDetail = () => {
    axios
      .get(`/api/articles/${id}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
        setProphetOptions(res.data.prophetOptions);
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
        setFileId(res.data[0].id);
        setFileName(res.data[0].fileName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ApiGetFile = (fileId: number) => {
    axios
      .get(`/api/files/download/${fileId}`, { responseType: "blob" })
      .then((res) => {
        setFileData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getDownload
  const ApiDownload = (fileId: number, fileName: string) => {
    axios
      .get(`/api/files/download/${fileId}`, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ApiPandas = (fileData: Blob, fileName: string) => {
    const formData = new FormData();
    formData.append("files", fileData, fileName);
    axios
      .post("/api/pandas", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ApiGetArtilceDetail();
    ApiGetArtilceDataFilePath();
  }, []);

  useEffect(() => {
    if (fileId) {
      ApiGetFile(fileId);
    }
  }, [fileId]);

  useEffect(() => {
    if (fileData && fileName) {
      ApiPandas(fileData, fileName);
    }
  }, [fileData]);

  return (
    <div>
      <div>디테일페이지 {id}번</div>
      <div>{title}</div>
      <div>{content}</div>
      <div>{prophetOptions}</div>
      {fileList.map((file, idx) => (
        <div key={idx}>
          {file.fileName}
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
