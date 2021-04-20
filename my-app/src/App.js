import Header from "./components/Header.js";
import Input from "./components/Input.js";
import Display from "./components/Display";
import WatchList from "./components/WatchList";
import Modal from "./components/Modal";
import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
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
  //console.log(modalSymbol);
  useEffect(() => {
    let d = new Date();
    let tempDate = localStorage.getItem("currentDay");
    today = `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`;
    if (tempDate === undefined) {
      localStorage.setItem("currentDay", today);
    } else if (tempDate !== today) {
      // update
      localStorage.setItem("currentDay", today);
    } else {
      return;
    }
  }, [today]); //maybe have no dependencies

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);
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
