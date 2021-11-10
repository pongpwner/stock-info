import Header from "./components/Header.js";
import Input from "./components/Input.js";
import Display from "./components/Display";
import WatchList from "./components/WatchList";
import Modal from "./components/Modal";
import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const api = {
    key: "J688E4HG3S7RD7V1",
    base: "https://www.alphavantage.co/",
    function1: "TIME_SERIES_INTRADAY",
    function2: "Global_QUOTE",
  };
  var localData;
  var JSONData;
  var localDate;
  var today;

  localData = localStorage.getItem("watchList");
  if (localData === undefined) {
    JSONData = [];
  } else {
    JSONData = JSON.parse(localData);
  }
  const [date, setDate] = useState("");
  const [watchList, setWatchList] = useState(JSONData);
  const [modalSymbol, setModalSymbol] = useState("");
  const [modalState, setModalState] = useState(false);
  //could be refactored into useReducer

  // useEffect(() => {
  //   let d = new Date();
  //   let tempDate = localStorage.getItem("currentDay");
  //   today = `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`;
  //   if (tempDate === undefined) {
  //     localStorage.setItem("currentDay", today);
  //   } else if (tempDate !== today) {
  //     // update
  //     localStorage.setItem("currentDay", today);
  //   } else {
  //     return;
  //   }
  // }, [today]); //maybe have no dependencies

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    let temp = watchList;
    if (temp === []) {
      return;
    }
    let temp1 = [];
    setWatchList(
      [],
      temp.forEach((stock) =>
        fetch(
          `${api.base}query?function=${api.function2}&symbol=${stock.symbol}&interval=5min&apikey=${api.key}`
        )
          .then((response) => response.json())
          .then((data) => {
            setWatchList((prevList) => [
              ...prevList,
              {
                symbol: data["Global Quote"]["01. symbol"].toUpperCase(),
                prevClose: data["Global Quote"]["08. previous close"],
                change: data["Global Quote"]["09. change"],
                changeP: data["Global Quote"]["10. change percent"],
                id: Math.random(),
              },
            ]);
          })
          .catch((err) => console.log("wrong symbol"))
      )
    );
  }, []);

  return (
    <div className="App">
      <Modal
        modalSymbol={modalSymbol}
        modalState={modalState}
        setModalState={setModalState}
      />
      <Header />
      <Input watchList={watchList} setWatchList={setWatchList} />

      <WatchList
        watchList={watchList}
        setWatchList={setWatchList}
        setModalSymbol={setModalSymbol}
        setModalState={setModalState}
        modalState={modalState}
      />
    </div>
  );
}

export default App;
