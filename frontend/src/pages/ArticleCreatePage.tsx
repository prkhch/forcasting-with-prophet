import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { DataItem } from "types/DataItem";
import useForamatDate from "hooks/useForamatDate";
import { ProphetOptions } from "types/ProphetOptions";
import { Charts } from "types/Charts";
import useBase64ToBlob from "hooks/useBase64ToBlob";

const ArticleCreatePage = () => {
  const formData = useRef(new FormData());

  // 파일
  const fileInput = useRef<HTMLInputElement>(null);

  // 게시글 정보
  const [title, setTitle] = useState("제목");
  const [content, setContent] = useState("내용");
  const [memberId, setMemberId] = useState("1");
  const [files, setFiles] = useState<File>();
  const [optionString, setOptionString] = useState("");
  const [dataSet, setDataSet] = useState<DataItem[]>([]);
  const [chartsObj, setChartsObj] = useState<Charts>({});

  // Upload, (csv, xls, xlsx)
  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    formData.current.append("files", files[0]);
    setFiles(files[0]);
    ApiPandas();
  };

  // pandas
  const ApiPandas = () => {
    console.log(formData.current.get("files"));
    axios
      .post("/api/pandas", formData.current)
      .then((res) => {
        console.log(res.data);
        setDataSet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // prophet
  const ApiProphet = () => {
    formData.current.append("prophetOptions", optionString);
    console.log(formData.current.get("prophetOptions"));
    axios
      .post("/api/prophet", formData.current)
      .then((res) => {
        setChartsObj(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 옵션
  const [options, setOptions] = useState<ProphetOptions>({
    growth: "logistic",
    dfCap: 6,
    dfFloor: 1.5,
    ftCap: 6,
    ftFloor: 1.5,
    cpScale: 0.5,
    cpList: [],
    cpThreshold: 0.01,
    periods: 365,
    holidays: "UK",
    holidayScale: 10,
    yearlyScale: "auto",
    weeklyScale: "auto",
    seasonMode: "additive",
    seasonScale: 10,
  });

  useEffect(() => {
    const tmp = JSON.stringify(options);
    setOptionString(tmp);
  }, []);

  useEffect(() => {
    const tmp = JSON.stringify(options);
    setOptionString(tmp);
  }, [options]);

  const addFilesToFormData = (chartsObj: Charts) => {
    Object.entries(chartsObj).forEach(([key, base64Array]) => {
      base64Array.forEach((base64, index) => {
        const blob = useBase64ToBlob(base64, "image/jpeg");
        const file = new File([blob], `${key}_${index}.jpeg`, { type: "image/jpeg" });
        formData.current.append("files", file);
      });
    });
    return formData;
  };

  // 등록
  const ApiCreateArticle = () => {
    console.log(chartsObj);
    addFilesToFormData(chartsObj);
    formData.current.append("title", title);
    formData.current.append("content", content);
    formData.current.append("memberId", memberId);
    // files already append
    // options already append
    console.log(formData.current.get("files"));
    axios
      .post("/api/article", formData.current)
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

      <input type="file" ref={fileInput} onChange={handleChangeUpload} />

      {chartsObj && (
        <div>
          {Object.keys(chartsObj).map((columnName, idx) => (
            <div key={idx}>
              <div>{columnName} </div>
              {chartsObj[columnName].map((chart, chartIdx) => (
                <img src={`data:image/jpeg;base64,${chart}`} alt={columnName} key={chartIdx} />
              ))}
            </div>
          ))}
        </div>
      )}

      {files && <button onClick={ApiProphet}>Run Prophet</button>}

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

      <button onClick={ApiCreateArticle}>등록</button>
    </div>
  );
};

export default ArticleCreatePage;
