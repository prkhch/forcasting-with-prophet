import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Charts, DataItem } from "types/DataItem";
import useForamatDate from "hooks/useForamatDate";
import { ProphetOptions } from "types/ProphetOptions";

const ChartCreatePage = () => {
  const formData = useRef(new FormData());

  // 파일
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  // 게시글 정보
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memberId, setMemberId] = useState("");
  const [chartsArr, setChartsArr] = useState<Charts>({});

  // 데이터셋 전송, Prophet
  const [dataSet, setDataSet] = useState<DataItem[]>([]);

  // const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   switch (name) {
  //     case "title":
  //       setTitle(value);
  //       break;
  //     case "content":
  //       setContent(value);
  //       break;
  //     case "memberId":
  //       setMemberId(value);
  //       break;
  //     case "growth":
  //       setGrowth(value);
  //       break;
  //     case "dfCap":
  //       setDfCap(value);
  //       break;
  //     case "dfFloor":
  //       setDfFloor(value);
  //       break;
  //     case "ftCap":
  //       setftCap(value);
  //       break;
  //     case "ftFloor":
  //       setftFloor(value);
  //       break;
  //     case "cpScale":
  //       setCpScale(value);
  //       break;
  //     case "cpList":
  //       setCpList(value);
  //       break;
  //     case "cpThreshold":
  //       setCpThreshold(value);
  //       break;
  //     case "periods":
  //       setPeriods(value);
  //       break;
  //     case "holidays":
  //       setHolidays(value);
  //       break;
  //     case "holidayScale":
  //       setHolidayScale(value);
  //       break;
  //     case "yearlyScale":
  //       setYearlyScale(value);
  //       break;
  //     case "weeklyScale":
  //       setWeeklyScale(value);
  //       break;
  //     case "seasonMode":
  //       setSeasonMode(value);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // pandas
  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    formData.current.append("file", files[0]);
    setFile(files[0]);
    ApiPandas();
  };
  const ApiPandas = () => {
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
    console.log(formData.current.get("file"));
    console.log(formData.current.get("options"));
    axios
      .post("/api/prophet", formData.current)
      .then((res) => {
        setChartsArr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(chartsArr);
    console.log(chartsArr.length);
  }, [chartsArr]);

  // 옵션
  const [options, setOptions] = useState<ProphetOptions>({
    growth: "linear",
    dfCap: 6,
    dfFloor: 1.5,
    ftCap: 6,
    ftFloor: 1.5,
    cpScale: 0.5,
    cpList: ["2022-05-05"],
    cpThreshold: 0.01,
    periods: 365,
    holidays: "KR",
    holidayScale: 10,
    yearlyScale: "auto",
    weeklyScale: "auto",
    seasonMode: "additive",
    seasonScale: 10,
  });

  useEffect(() => {
    const optionsString = JSON.stringify(options);
    formData.current.append("options", optionsString);
  }, []);

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

      {/* <input name="title" type="text" onChange={handleChangeText} placeholder="제목" />
      <input name="content" type="textarea" onChange={handleChangeText} placeholder="내용" />
      <input name="memberId" type="text" onChange={handleChangeText} placeholder="작성자" /> */}

      <hr />

      <input type="file" ref={fileInput} onChange={handleChangeUpload} />
      {/* <img src={`data:image/jpeg;base64,${charts.keys()}`} alt="" /> */}

      {chartsArr && (
        <div>
          {Object.keys(chartsArr).map((columnName, idx) => (
            <div key={idx}>
              <div>{columnName} </div>
              {chartsArr[columnName].map((chart, chartIdx) => (
                <img src={`data:image/jpeg;base64,${chart}`} alt={columnName} key={chartIdx} />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* <input name="growth" type="text" onChange={handleChangeText} placeholder="(linear/logistic)" />
      <input name="dfCap" type="number" onChange={handleChangeText} placeholder="데이터프레임 상한" />
      <input name="dfFloor" type="number" onChange={handleChangeText} placeholder="데이터프레임 하한" />
      <input name="ftCap" type="number" onChange={handleChangeText} placeholder="미래 DF 상한" />
      <input name="ftFloor" type="number" onChange={handleChangeText} placeholder="미래 DF 하한" />
      <input name="cpScale" type="number" onChange={handleChangeText} placeholder="변화점 우선 순위 척도" />
      <input name="cpList" type="text" onChange={handleChangeText} placeholder="추가 변화점 리스트" />
      <input name="cpThreshold" type="number" onChange={handleChangeText} placeholder="특정 임계값 이상의 변화점" />
      <input name="periods" type="number" onChange={handleChangeText} placeholder="예측 기간" />
      <input name="holidays" type="text" onChange={handleChangeText} placeholder="공휴일 국가 코드" />
      <input name="holidayScale" type="number" onChange={handleChangeText} placeholder="공휴일 우선 순위 척도" />
      <input name="yearlyScale" type="number" onChange={handleChangeText} placeholder="연간 우선 순위 척도" />
      <input name="weeklyScale" type="number" onChange={handleChangeText} placeholder="주간 우선 순위 척도" />
      <input name="seasonMode" type="text" onChange={handleChangeText} placeholder="(additive/multiplicative)" /> */}
      {file && <button onClick={ApiProphet}>차트전송</button>}

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
    </div>
  );
};

export default ChartCreatePage;
