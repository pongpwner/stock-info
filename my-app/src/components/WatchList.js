import React, { useState, useEffect } from "react";
import StockWatch from "./StockWatch";

export default function WatchList({
  watchList,
  setWatchList,
  setModalSymbol,
  setModalState,
  modalState,
}) {
  // make a button with a function that sets the watchlist to itself to rerender the page
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
        />
      ))}
    </div>
  );
}
