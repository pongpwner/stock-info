import React from "react";
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
  //call the api using stock[symbol] to get information make the api call every time at midnight
  function deleteStock() {
    setWatchList((watchList) => watchList.filter((ev) => ev.id !== stock.id));
  }
  function toggleModal() {
    setModalState(!modalState);
    setModalSymbol(symbol);
    console.log("a");
  }

  return (
    <div className="stockWatchContainer" onClick={toggleModal}>
      <button onClick={deleteStock}>delete</button>
      <div className="">Symbol:{symbol} </div>
      <div className="">Prev Close: {prevClose}</div>
      <div className="">Change:{change}</div>
      <div className="">Percent Change:{changeP}</div>
    </div>
  );
}
