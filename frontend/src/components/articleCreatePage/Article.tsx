import axios from "axios";
import useBase64ToBlob from "hooks/useBase64ToBlob";
import useForamatDate from "hooks/useForamatDate";
import React, { useEffect, useRef, useState } from "react";
import StyledArticle from "styles/articleDetailPage/StyledArticle";
import StyledDataItem from "styles/articleDetailPage/StyledDataItem";
import StyledDataRow from "styles/articleDetailPage/StyledDataRow";
import StyledDataSet from "styles/articleDetailPage/StyledDataSet";
import StyledColLayout from "styles/StyledColLayout";
import StyledSmallButton from "styles/StyledSmallButton";
import { Charts } from "types/Charts";
import { DataItem } from "types/DataItem";
import { ProphetOptions } from "types/ProphetOptions";
import Carousel from "./Carousel";

const Article = () => {
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
        console.log(res.data);
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
  console.log(chartsObj);

  return (
    <StyledArticle>
      <StyledColLayout>
        <div>
          <input type="file" ref={fileInput} onChange={handleChangeUpload} />
        </div>
      </StyledColLayout>

      {/* 데이터셋 */}
      {dataSet.length > 0 && (
        <StyledDataSet>
          <StyledDataRow>
            {Object.keys(dataSet[0]).map((key, idx) => (
              <StyledDataItem key={idx}>{key}</StyledDataItem>
            ))}
          </StyledDataRow>

          {dataSet.map((item, index) => (
            <StyledDataRow key={index}>
              {Object.entries(item).map(([key, value]) => {
                const isDate = key.includes("Date");
                const inputValue = isDate ? useForamatDate(value) : value;

                return <StyledDataItem key={key}>{inputValue}</StyledDataItem>;
              })}
            </StyledDataRow>
          ))}
        </StyledDataSet>
      )}

      {Object.keys(chartsObj).length > 0 && (
        <StyledColLayout>
          <Carousel chartsObj={chartsObj} />
        </StyledColLayout>
      )}

      {files && Object.keys(chartsObj).length == 0 && (
        <StyledColLayout>
          <StyledSmallButton onClick={ApiProphet}>Run Prophet</StyledSmallButton>
        </StyledColLayout>
      )}

      {files && Object.keys(chartsObj).length > 0 && (
        <StyledColLayout>
          <StyledSmallButton onClick={ApiCreateArticle}>등록</StyledSmallButton>
        </StyledColLayout>
      )}
    </StyledArticle>
  );
};

export default Article;
