import React, { useState, useRef } from "react";
import axios from "axios";

const ChartCreatePage = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const formData = new FormData();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memberId, setMemberId] = useState("");
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleChangeMemberId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
  };

  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setFile(files[0]);
    if (!file) return;
    formData.append("file", file);
  };

  const handleClickUpload = () => {
    fileInput.current?.click();
  };

  const ApiPostCreateChart = () => {
    console.log(title, content, memberId);
    axios
      .post("/api/chart", {
        title: title,
        content: content,
        memberId: memberId,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>등록 페이지</div>
      <input
        type="file"
        ref={fileInput}
        onChange={handleChangeUpload}
        style={{ display: "none" }}
      />
      <button onClick={handleClickUpload}>업로드</button>
      <button onClick={ApiPostCreateChart}>전송</button>
      <input type="text" onChange={handleChangeTitle} defaultValue="제목" />
      <input
        type="textarea"
        onChange={handleChangeContent}
        defaultValue="내용"
      />
      <input
        type="text"
        onChange={handleChangeMemberId}
        defaultValue="작성자"
      />
    </div>
  );
};

export default ChartCreatePage;
