import React, { useEffect, useState } from "react";

export default function Display({ symbol, watchList, setWatchList }) {
  const [symbolU, setSymbolU] = useState(""); //formatted symbol all caps put in the scope of the fetch
  const [prevClose, setPrevClose] = useState("");
  const [change, setChange] = useState("");
  const [changeP, setChangeP] = useState("");
  const api = {
    key: "J688E4HG3S7RD7V1",
    base: "https://www.alphavantage.co/",
    function1: "TIME_SERIES_INTRADAY",
    function2: "Global_QUOTE",
  };
  useEffect(() => {
    console.log(symbol);
    fetch(
      `${api.base}query?function=${api.function2}&symbol=${symbol}&interval=5min&apikey=${api.key}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSymbolU(data["Global Quote"]["01. symbol"].toUpperCase());
        setPrevClose(data["Global Quote"]["08. previous close"]);
        setChange(data["Global Quote"]["09. change"]);
        setChangeP(data["Global Quote"]["10. change percent"]);
      })
      .catch((err) => console.log("wrong symbol"));
  }, [symbol, api.base, api.key, api.function2, api.function1]);

  function addToWatchList() {
    setWatchList((prevList) => [
      ...prevList,
      {
        symbol: symbolU,
        id: Math.random(),
        prevClose: prevClose,
        change: change,
        changeP: changeP,
      },
    ]);
    console.log(watchList);
  }

  return (
    <div className="displayContainer">
      <button className="addStockButton" onClick={addToWatchList}>
        add to watch list
      </button>
      <div className="symbol">Symbol:{symbolU}</div>
      <div className="prevCLose">Prev Close:{prevClose} </div>
      <div className="change">Change:{change}</div>
      <div className="percentChange">Percent Change:{changeP}</div>
    </div>
  );
}
