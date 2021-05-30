import React, { useEffect, useState } from "react";
// make so when clicked a modal with more information about the stock will come up
// create modal information state in app.js prop drill to here and have a function that toggles modal state and changes the
//required infomration
export default function StockWatch({
  stock,
  watchList,
  setWatchList,
  key,
  symbol,
  prevClose,
  change,
  changeP,
  setModalSymbol,
  setModalState,
  modalState,
}) {
  // const [symbolU1, setSymbolU] = useState(""); //formatted symbol all caps
  // const [prevClose1, setPrevClose] = useState("");
  // const [change1, setChange] = useState("");
  // const [changeP1, setChangeP] = useState("");
  // const api = {
  //   key: "J688E4HG3S7RD7V1",
  //   base: "https://www.alphavantage.co/",
  //   function1: "TIME_SERIES_INTRADAY",
  //   function2: "Global_QUOTE",
  // };
  // useEffect(() => {
  //   fetch(
  //     `${api.base}query?function=${api.function2}&symbol=${symbol}&interval=5min&apikey=${api.key}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setSymbolU(data["Global Quote"]["01. symbol"].toUpperCase());
  //       setPrevClose(data["Global Quote"]["08. previous close"]);
  //       setChange(data["Global Quote"]["09. change"]);
  //       setChangeP(data["Global Quote"]["10. change percent"]);
  //     })
  //     .catch((err) => console.log("wrong symbol"));
  // }, []);
  //call the api using stock[symbol] to get information make the api call every time at midnight
  function deleteStock() {
    setWatchList((watchList) => watchList.filter((ev) => ev.id !== stock.id));
  }
  function toggleModal() {
    setModalState(!modalState);
    setModalSymbol(symbol);
  }

  return (
    <div className="stockWatchContainer">
      <button className="deleteStockButton" onClick={deleteStock}>
        X
      </button>
      <div className="openModal" onClick={toggleModal}>
        <div className="stockWatchInfo">{symbol} </div>

        {/* <div className="stockWatchInfo">Prev Close: {prevClose}</div>
<div className="stockWatchInfo">Change:{change}</div>
<div className="stockWatchInfo">Percent Change:{changeP}</div>  */}
      </div>
    </div>
  );
}
