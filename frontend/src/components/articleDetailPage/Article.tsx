import axios from "axios";
import handleForamatDelTime from "utils/handleForamatDelTime";
import { useEffect, useState } from "react";
import StyledArticle from "styles/articleDetailPage/StyledArticle";
import StyledContent from "styles/articleDetailPage/StyledContent";
import StyledDataItem from "styles/articleDetailPage/StyledDataItem";
import StyledDataRow from "styles/articleDetailPage/StyledDataRow";
import StyledDataSet from "styles/articleDetailPage/StyledDataSet";
import StyledLink from "styles/articleDetailPage/StyledLink";
import StyledTitle from "styles/articleDetailPage/StyledTitle";
import { DataItem } from "types/DataItem";
import { FileResponse } from "types/FileResponse";
import Carousel from "./Carousel";
import Options from "./Options";
import StyledColLayout from "styles/common/StyledColLayout";
import StyledLabel from "styles/common/StyledLabel";

const Article = ({ id }: { id: string }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [prophetOptions, setProphetOptions] = useState("");

  const [fileList, setFileList] = useState<FileResponse[]>([]);
  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState();
  const [fileId, setFileId] = useState();

  const [dataSet, setDataSet] = useState<DataItem[]>([]);

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

  // const ApiPandas = (fileData: Blob, fileName: string) => {
  //   const formData = new FormData();
  //   formData.append("files", fileData, fileName);
  //   axios
  //     .post("/api/pandas", formData)
  //     .then((res) => {
  //       console.log(res.data);
  //       setDataSet(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
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

  useEffect(() => {
    if (fileData && fileName) {
      // ApiPandas(fileData, fileName);
    }
  }, [fileData]);

  return (
    <StyledArticle>
      <StyledColLayout>
        <StyledTitle>
          <StyledLabel>Title</StyledLabel>
          {title}
          <div>
            {fileList[0] && (
              <StyledLink onClick={() => ApiDownload(fileList[0].id, fileList[0].fileName)}>
                {fileList[0].fileName}
              </StyledLink>
            )}
          </div>
        </StyledTitle>
        <br />
        <StyledContent>
          <StyledLabel>Content</StyledLabel>
          {content}
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
        <br />

        <Carousel fileList={fileList} />
      </StyledColLayout>
    </StyledArticle>
  );
};

export default Article;