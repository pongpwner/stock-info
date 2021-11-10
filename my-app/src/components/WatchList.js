import React, { useState, useEffect } from "react";
import StockWatch from "./StockWatch";

export default function WatchList({
  watchList,
  setWatchList,
  setModalSymbol,
  setModalState,
  modalState,
}) {
  return (
    <div className="watchListContainer">
      {watchList.map((stock) => (
        <StockWatch
          stock={stock}
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
