import axios from "axios";
import handleBase64ToBlob from "utils/handleBase64ToBlob";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledArticle from "styles/articleDetailPage/StyledArticle";
import { DataItem } from "types/DataItem";
import StyledDataItem from "styles/articleDetailPage/StyledDataItem";
import StyledDataRow from "styles/articleDetailPage/StyledDataRow";
import StyledDataSet from "styles/articleDetailPage/StyledDataSet";
import StyledColLayout from "styles/common/StyledColLayout";
import StyledSmallButton from "styles/common/StyledSmallButton";
import { StyledUploadButton, StyledHiddendInput } from "styles/common/StyledUploadInput";
import { Charts } from "types/Charts";
import { ProphetOptions } from "types/ProphetOptions";
import Carousel from "./Carousel";
import CategoryInput from "./CategoryInput";
import ContentInput from "./ContentInput";
import TitleInput from "./TitleInput";
import UploadInput from "./UploadInput";
import Options from "./Options/Options";

const Article = () => {
  const navigate = useNavigate();
  const formData = useRef(new FormData());

  // 파일
  const fileInput = useRef<HTMLInputElement>(null);
  // 게시글 정보
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [memberId, setMemberId] = useState("1");
  const [categoryId, setCategoryId] = useState("1");
  const [files, setFiles] = useState<File>();
  const [fileName, setFileName] = useState("");
  const [optionString, setOptionString] = useState("");
  // const [dataSet, setDataSet] = useState<DataItem[]>([]);
  const [chartsObj, setChartsObj] = useState<Charts>({});

  // Upload, (csv, xls, xlsx)
  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    formData.current.append("files", files[0]);
    setFiles(files[0]);
    setFileName(files[0].name);
    console.log(files);
    // ApiPandas();
  };

  // pandas
  // const ApiPandas = () => {
  //   console.log(formData.current.get("files"));
  //   axios
  //     .post("/api/pandas", formData.current)
  //     .then((res) => {
  //       console.log(res.data);
  //       setDataSet(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
        console.log(err.response.data.error);
      });
  };

  const addFilesToFormData = (chartsObj: Charts) => {
    Object.entries(chartsObj).forEach(([key, base64Array]) => {
      base64Array.forEach((base64, index) => {
        const blob = handleBase64ToBlob(base64, "image/jpeg");
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
    formData.current.append("categoryId", categoryId);
    // files already append
    // options already append
    console.log(formData.current.get("files"));
    axios
      .post("/api/article", formData.current)
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledArticle>
      <StyledColLayout>
        <CategoryInput categoryId={categoryId} setCategoryId={setCategoryId} />

        <TitleInput title={title} setTitle={setTitle} />

        <ContentInput content={content} setContent={setContent} />

        {fileName && <Options optionsString={optionString} setOptionString={setOptionString} />}

        <UploadInput fileInput={fileInput} handleChangeUpload={handleChangeUpload} fileName={fileName} />

        {/* 데이터셋 */}
        {/* {dataSet.length > 0 && (
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
      )} */}

        {Object.keys(chartsObj).length > 0 && <Carousel chartsObj={chartsObj} />}

        {files && Object.keys(chartsObj).length == 0 && (
          <StyledSmallButton onClick={ApiProphet}>Run Prophet</StyledSmallButton>
        )}

        {files && Object.keys(chartsObj).length > 0 && (
          <StyledSmallButton onClick={ApiCreateArticle}>Submit</StyledSmallButton>
        )}
      </StyledColLayout>
    </StyledArticle>
  );
};

export default Article;
