import React, { useState, useEffect } from "react";
import Display from "./Display";

export default function Input({ watchList, setWatchList }) {
  const [search, setSearch] = useState("");
  const [symbol, setSymbol] = useState("");

  function searchSymbol() {
    setSymbol(search);
    console.log(symbol);
  }

  return (
    <div className="inputContainer">
      <input
        className="searchbar"
        type="text"
        placeholder="Search a stock"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <input
        className="searchButton"
        type="submit"
        value="search"
        placeholder="search"
        onClick={searchSymbol}
      ></input>
      <Display
        symbol={symbol}
        watchList={watchList}
        setWatchList={setWatchList}
      />
    </div>
  );
}
