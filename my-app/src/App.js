import Header from "./components/Header.js";
import Input from "./components/Input.js";
import Display from "./components/Display";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [watchList, setWatchList] = useState([]);
  return (
    <div className="App">
      <Header />
      <Input watchList={watchList} setWatchList={setWatchList} />
    </div>
  );
}

export default App;
