import axios from "axios";
import handleBase64ToBlob from "utils/handleBase64ToBlob";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loadingState } from "recoils/atoms/loadingState";
import { Charts } from "types/Charts";
import Carousel from "./Carousel";
import CategoryInput from "./CategoryInput";
import ContentInput from "./ContentInput";
import TitleInput from "./TitleInput";
import UploadInput from "./UploadInput";
import Options from "./Options/Options";
import StyledArticle from "styles/articleDetailPage/StyledArticle";
// import { StyledDataItem, StyledDataRow, StyledDataSet } from "styles/common/StyledDataSet";
import { StyledColLayout, StyledRowLayout } from "styles/common/StyledLayout";
import { StyledButton } from "styles/common/StyledButton";
import { StyledErrorText } from "styles/common/StyledText";

const Article = () => {
  const navigate = useNavigate();
  const formData = useRef(new FormData());
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  // 파일
  const fileInput = useRef<HTMLInputElement>(null);
  // 게시글 정보
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [memberId, setMemberId] = useState("1");
  const [categoryId, setCategoryId] = useState("1");
  const [files, setFiles] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [optionString, setOptionString] = useState("");
  // const [dataSet, setDataSet] = useState<DataItem[]>([]);
  const [chartsObj, setChartsObj] = useState<Charts>({});

  const [errorMessage, setErrorMessage] = useState("");

  // Upload, (csv, xls, xlsx)
  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const fileSize = files[0].size / 1024 / 1024;
      if (fileSize > 10) {
        setErrorMessage("File size cannot exceed 10MB.");
        return;
      }
      formData.current.set("files", files[0]);
      setFiles(files[0]);
      if (files[0].name) {
        setFileName(files[0].name);
        ApiPandas();
      }
    }
  };

  // pandas;
  const ApiPandas = () => {
    setErrorMessage("");
    setIsLoading(true);
    axios
      .post("/api/spring/pandas", formData.current)
      .then((res) => {
        setIsLoading(false);
        // setDataSet(res.data);
      })
      .catch((err) => {
        setFileName("");
        setFiles(null);
        setErrorMessage(err.response.data.error);
        setIsLoading(false);
      });
  };

  // prophet
  const ApiProphet = () => {
    formData.current.set("prophetOptions", optionString);
    setErrorMessage("");
    setIsLoading(true);
    axios
      .post("/api/spring/prophet", formData.current)
      .then((res) => {
        setChartsObj(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
        setIsLoading(false);
      });
  };

  const addFilesToFormData = (chartsObj: Charts) => {
    Object.entries(chartsObj).forEach(([key, base64Array]) => {
      base64Array.forEach((base64, index) => {
        const blob = handleBase64ToBlob(base64, "image/jpeg");
        const file = new File([blob], `${key}_${index}.jpeg`, {
          type: "image/jpeg",
        });
        formData.current.append("files", file);
      });
    });
    return formData;
  };

  // 등록
  const ApiCreateArticle = () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a title.");
      return;
    }
    if (!content.trim()) {
      setErrorMessage("Please enter a content.");
      return;
    }

    setIsLoading(true);
    addFilesToFormData(chartsObj);
    formData.current.set("title", title);
    formData.current.set("content", content);
    formData.current.set("categoryId", categoryId);
    // files already set
    // options already set
    console.log(formData.current);
    axios
      .post("/api/spring/article", formData.current)
      .then((res) => {
        setIsLoading(false);
        navigate(-1);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <StyledArticle>
      <StyledColLayout>
        <CategoryInput categoryId={categoryId} setCategoryId={setCategoryId} />

        <TitleInput title={title} setTitle={setTitle} />

        <ContentInput content={content} setContent={setContent} />

        {fileName && (
          <Options
            optionsString={optionString}
            setOptionString={setOptionString}
          />
        )}

        <UploadInput
          fileInput={fileInput}
          handleChangeUpload={handleChangeUpload}
          fileName={fileName}
        />

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

        {Object.keys(chartsObj).length > 0 && (
          <Carousel chartsObj={chartsObj} />
        )}

        <StyledErrorText>{errorMessage}</StyledErrorText>

        <StyledRowLayout>
          {files && Object.keys(chartsObj).length >= 0 && (
            <StyledButton onClick={ApiProphet}>Run Prophet</StyledButton>
          )}

          {files && Object.keys(chartsObj).length >= 0 && (
            <StyledButton onClick={ApiCreateArticle}>Post</StyledButton>
          )}
        </StyledRowLayout>
      </StyledColLayout>
    </StyledArticle>
  );
};

export default Article;
