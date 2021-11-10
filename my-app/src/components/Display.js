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
    fetch(
      `${api.base}query?function=${api.function2}&symbol=${symbol}&interval=5min&apikey=${api.key}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSymbolU(data["Global Quote"]["01. symbol"].toUpperCase());
        setPrevClose(data["Global Quote"]["08. previous close"]);
        setChange(data["Global Quote"]["09. change"]);
        setChangeP(data["Global Quote"]["10. change percent"]);
      })
      .catch((err) => console.log("wrong symbol"));
  }, [symbol, api.base, api.key, api.function2, api.function1]);

  function addToWatchList() {
    for (let i = 0; i < watchList.length; i++) {
      if (symbolU === watchList[i].symbol) {
        return;
      }
    }
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
  }

  return (
    <div className="displayContainer">
      <div className="displayItem symbol">Symbol:{symbolU}</div>
      <div className="displayItem  prevCLose">Prev Close:{prevClose} </div>
      <div className="displayItem">
        Change:
        <span
          className={`displayItem  change ${
            change > 0 ? "positive" : "negative"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="displayItem">
        Percent Change:
        <span
          className={`displayItem  change ${
            change > 0 ? "positive" : "negative"
          }`}
        >
          {changeP}
        </span>
      </div>
      <button className="displayItem addStockButton" onClick={addToWatchList}>
        add to watch list
      </button>
    </div>
  );
}
