import React, { useState, useEffect } from "react";
import StockWatch from "./StockWatch";

export default function WatchList({
  watchList,
  setWatchList,
  setModalSymbol,
  setModalState,
  modalState,
}) {
  // use local sotrage to store a date and rerender if new date does not match old date
  const [symbolU, setSymbolU] = useState(""); //formatted symbol all caps
  const [prevClose, setPrevClose] = useState("");
  const [change, setChange] = useState("");
  const [changeP, setChangeP] = useState("");

  const api = {
    key: "J688E4HG3S7RD7V1",
    base: "https://www.alphavantage.co/",
    function1: "TIME_SERIES_INTRADAY",
    function2: "Global_QUOTE",
  };
  let temp1 = [];
  async function update() {
    console.log(watchList);
    ///////////////////////
    //////////////////////////////
    ///////////////////
    await setWatchList(
      watchList.map((stock) => {
        console.log(stock.symbol);
        ///////////////////// need to use async
        fetch(
          `${api.base}query?function=${api.function2}&symbol=${stock.symbol}&interval=5min&apikey=${api.key}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setSymbolU(data["Global Quote"]["01. symbol"].toUpperCase());
            setPrevClose(data["Global Quote"]["08. previous close"]);
            setChange(data["Global Quote"]["09. change"]);
            setChangeP(data["Global Quote"]["10. change percent"]);
          })
          // this all executes but it only returns the last value of the changes because the code under does not run immediatly after
          .catch((err) => console.log("wrong symbol"));
        return {
          symbol: stock.symbol,
          id: stock.id,
          prevClose: prevClose,
          change: change,
        };
      })
    );
    console.log(watchList);

    //////////////////
  }
  async function update1() {
    await update().then(() => {
      console.log(temp1);
      setWatchList(temp1);
      console.log(watchList);
      temp1 = [];
    });
  }

  return (
    //need to make this refresh and re call the api on button press or time interval
    //have an array with the names of symbols and map into stock watch where stock watch runs the api with the symbol
    <div className="watchListContainer">
      {watchList.map((stock) => (
        <StockWatch
          stock={stock} // has to be first for some reason
          watchList={watchList}
          setWatchList={setWatchList}
          key={stock.id}
          symbol={stock.symbol}
          prevClose={stock.prevClose}
          change={stock.change}
          changeP={stock.changeP}
          setModalSymbol={setModalSymbol}
          setModalState={setModalState}
          modalState={modalState}
          companyName={stock.name}
        />
      ))}
    </div>
  );
}
