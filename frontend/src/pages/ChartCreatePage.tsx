import React, { useState, useRef } from "react";
import axios from "axios";
import { DataItem } from "types/DataItem";
import { spawn } from "child_process";
import useForamatDate from "hooks/useForamatDate";

const ChartCreatePage = () => {
  // 파일
  const fileInput = useRef<HTMLInputElement>(null);
  const formData = new FormData();

  // 차트 정보
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

  // 파일 업로드
  const [dataSet, setDataSet] = useState<DataItem[]>([]);
  const handleInputChange = (index: number, key: string, value: string) => {
    const newData = [...dataSet];
    const newItem = { ...newData[index], [key]: value };
    newData[index] = newItem;
    setDataSet(newData);
  };
  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    formData.append("file", files[0]);
    console.log(formData.get("file"));
  };
  const handleClickUpload = () => {
    fileInput.current?.click();
  };
  const ApiPostExcelFile = () => {
    console.log(formData.get("file"));
    axios
      .post("/api/xls", formData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setDataSet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 등록
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

      <hr />

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

      <hr />

      <input
        type="file"
        ref={fileInput}
        onChange={handleChangeUpload}
        style={{ display: "none" }}
      />
      <button onClick={handleClickUpload}>업로드</button>
      <button onClick={ApiPostExcelFile}>엑셀전송</button>

      {dataSet.length > 0 && (
        <div>
          {Object.keys(dataSet[0]).map((key) => (
            <input key={`header-${key}`} type="text" value={key} readOnly />
          ))}
        </div>
      )}

      {dataSet.map((item, index) => (
        <div key={index}>
          {Object.entries(item).map(([key, value]) => {
            const isDate = key.includes("Date");
            const inputValue = isDate ? useForamatDate(value) : value;

            return (
              <input
                key={key}
                type={isDate ? "date" : "text"}
                value={inputValue}
                onChange={(e) => handleInputChange(index, key, e.target.value)}
              />
            );
          })}
        </div>
      ))}

      <hr />

      <button onClick={ApiPostCreateChart}>차트전송</button>
    </div>
  );
};

export default ChartCreatePage;
