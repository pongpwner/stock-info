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

  localData = localStorage.getItem("watchList");
  if (localData === undefined) {
    console.log("yahoo");
    JSONData = [];
  } else {
    JSONData = JSON.parse(localData);
  }

  const [watchList, setWatchList] = useState(JSONData);
  const [modalSymbol, setModalSymbol] = useState("");
  const [modalState, setModalState] = useState(false);
  //console.log(modalSymbol);

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
