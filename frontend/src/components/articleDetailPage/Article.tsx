import { useEffect, useState } from "react";
import axios from "axios";
import { DataItem } from "types/DataItem";
import { FileResponse } from "types/FileResponse";
import Carousel from "./Carousel";
import Options from "./Options";
import { useRecoilState } from "recoil";
import { loadingState } from "recoils/atoms/loadingState";

import StyledArticle from "styles/articleDetailPage/StyledArticle";
import StyledContent from "styles/articleDetailPage/StyledContent";
// import { StyledDataItem, StyledDataRow, StyledDataSet } from "styles/common/StyledDataSet";
import StyledLink from "styles/articleDetailPage/StyledLink";
import { StyledTitle } from "styles/common/StyledText";
import { StyledColLayout } from "styles/common/StyledLayout";
import { StyledLabel } from "styles/common/StyledLabel";

const Article = ({ id }: { id: string }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [prophetOptions, setProphetOptions] = useState("");

  const [fileList, setFileList] = useState<FileResponse[]>([]);
  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState();
  const [fileId, setFileId] = useState();

  const [dataSet, setDataSet] = useState<DataItem[]>([]);

  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  // getArticle
  const ApiGetArtilceDetail = () => {
    setIsLoading(true);
    axios
      .get(`/api/spring/articles/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setProphetOptions(res.data.prophetOptions);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  // getDataFile
  const ApiGetArtilceDataFilePath = () => {
    setIsLoading(true);
    axios
      .get(`/api/spring/datafile/${id}`)
      .then((res) => {
        setFileList(res.data);
        setFileId(res.data[0].id);
        setFileName(res.data[0].fileName);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const ApiGetFile = (fileId: number) => {
    setIsLoading(true);
    axios
      .get(`/api/spring/files/download/${fileId}`, { responseType: "blob" })
      .then((res) => {
        setFileData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  // getDownload
  const ApiDownload = (fileId: number, fileName: string) => {
    setIsLoading(true);
    axios
      .get(`/api/spring/files/download/${fileId}`, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  // const ApiPandas = (fileData: Blob, fileName: string) => {
  //   const formData = new FormData();
  //   formData.append("files", fileData, fileName);
  //   axios
  //     .post("/api/spring/pandas", formData)
  //     .then((res) => {
  //       setDataSet(res.data);
  //     })
  //     .catch((err) => {
  //     });
  // };

  useEffect(() => {
    ApiGetArtilceDetail();
    ApiGetArtilceDataFilePath();
  }, []);

  useEffect(() => {
    if (fileId) {
      ApiGetFile(fileId);
    }
  }, [fileId]);

  // useEffect(() => {
  //   if (fileData && fileName) {
  //     // ApiPandas(fileData, fileName);
  //   }
  // }, [fileData]);

  return (
    <StyledArticle>
      <StyledColLayout>
        <StyledTitle>
          <StyledLabel>Title</StyledLabel>
          {title}
          <div>
            {fileList[0] && (
              <StyledLink
                onClick={() =>
                  ApiDownload(fileList[0].id, fileList[0].fileName)
                }
              >
                {fileList[0].fileName}
              </StyledLink>
            )}
          </div>
        </StyledTitle>

        <StyledContent>
          <StyledLabel>Content</StyledLabel>
          {content}
          <hr />
        </StyledContent>
        <br />
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
                const inputValue = isDate ? handleForamatDelTime(value) : value;
                
                return <StyledDataItem key={key}>{inputValue}</StyledDataItem>;
              })}
              </StyledDataRow>
              ))}
              </StyledDataSet>
            )} */}

        <Options optionsString={prophetOptions} />

        <Carousel fileList={fileList} />
      </StyledColLayout>
    </StyledArticle>
  );
};

export default Article;
