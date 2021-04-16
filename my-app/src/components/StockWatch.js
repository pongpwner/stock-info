import React from "react";

export default function StockWatch({
  stock,
  watchList,
  setWatchList,

  key,
  symbol,
  prevClose,
  change,
  changeP,
}) {
  function deleteStock() {
    console.log(symbol);
    setWatchList((watchList) => watchList.filter((ev) => ev.id !== stock.id));
    console.log(watchList);
  }
  return (
    <div className="stockWatchContainer">
      <button onClick={deleteStock}>delete</button>
      <div className="">Symbol:{symbol} </div>
      <div className="">Prev Close: {prevClose}</div>
      <div className="">Change:{change}</div>
      <div className="">Percent Change:{changeP}</div>
    </div>
  );
}
