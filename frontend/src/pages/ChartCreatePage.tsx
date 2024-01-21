import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { DataItem } from "types/DataItem";
import useForamatDate from "hooks/useForamatDate";

const ChartCreatePage = () => {
  // 파일
  const fileInput = useRef<HTMLInputElement>(null);
  var formData = new FormData();

  // 게시글 정보
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

  // 데이터셋 전송, Prophet
  const [dataSet, setDataSet] = useState<DataItem[]>([]);
  const handleInputChange = (index: number, key: string, value: string) => {
    const newData = [...dataSet];
    const newItem = { ...newData[index], [key]: value };
    newData[index] = newItem;
    setDataSet(newData);
  };
  useEffect(() => {}, [dataSet]);
  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData = new FormData();
    const files = e.target.files;
    if (!files) return;
    formData.append("file", files[0]);
    console.log(formData.get("file"));
  };
  // const handleClickUpload = () => {
  //   fileInput.current?.click();
  // };
  const ApiPostExcelFile = () => {
    console.log(formData.get("file"));
    axios
      .post("/api/pandas", formData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setDataSet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 옵션
  const [growth, setGrowth] = useState("linear"); // 선형 || 로지스틱

  // 로지스틱 선택 시 추가 옵션
  const [dfCap, setDfCap] = useState(); // 데이터프레임 상한
  const [dfFloor, setDfFloor] = useState(); // 데이터프레임 하한
  const [ftCap, setftCap] = useState(); // 미래DF 상한
  const [ftFloor, setftFloor] = useState(); // 미래DF 하한

  // FLAG
  const [cpScale, setCpScale] = useState(); // changepoint_prior_scale
  const [cpList, setCpList] = useState<[]>(); // changepoints 추가
  const [cpThreshold, setCpThreshold] = useState(0.01); // 특정 임계값 이상의 cp를 선별

  const [periods, setPeriods] = useState(365); // 예측 기간

  const [holidays, setHolidays] = useState(); // 공휴일 국가 코드
  const [holidayScale, setHolidayScale] = useState(); // holidays_prior_scale
  const [yearlyScale, setYearlyScale] = useState(); // yearly_prior_scale
  const [weeklyScale, setWeeklyScale] = useState(); // weekly_prior_scale
  const [seasonMode, setSeasonMode] = useState("addtive"); // addtive || multiplicative

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

      <input type="file" ref={fileInput} onChange={handleChangeUpload} />
      {/* <button onClick={handleClickUpload}>업로드</button> */}
      <button onClick={ApiPostExcelFile}>엑셀전송</button>

      {dataSet.length > 0 && (
        <div>
          {Object.keys(dataSet[0]).map((key, idx) => (
            <span key={idx}>{key} || </span>
          ))}
        </div>
      )}

      {dataSet.map((item, index) => (
        <div key={index}>
          {Object.entries(item).map(([key, value]) => {
            const isDate = key.includes("Date");
            const inputValue = isDate ? useForamatDate(value) : value;

            return <span key={key}>{inputValue} || </span>;
          })}
        </div>
      ))}

      <hr />

      <button onClick={ApiPostCreateChart}>차트전송</button>
    </div>
  );
};

export default ChartCreatePage;
