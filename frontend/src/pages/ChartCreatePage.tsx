import React, { useState, useRef } from "react";

const ChartCreatePage = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const formData = new FormData();

  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setFile(files[0]);
  };

  const handleClickUpload = () => {
    fileInput.current?.click();
  };

  const handlePostFile = () => {
    if (!file) return;
    formData.append("file", file);
    console.log(formData.get("file"));
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
      {file && <button onClick={handlePostFile}>전송</button>}
    </div>
  );
};

export default ChartCreatePage;
