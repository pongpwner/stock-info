import React, { useState, useEffect } from "react";

export default function Modal({ modalSymbol, modalState, setModalState }) {
  //console.log(modalState);
  const api = {
    key: "J688E4HG3S7RD7V1",
    base: "https://www.alphavantage.co/",
    function1: "TIME_SERIES_INTRADAY",
    function2: "Global_QUOTE",
    function3: "OVERVIEW",
  };
  const [marketcap, setMarketcap] = useState("");
  const [forwardPe, setForwardPe] = useState("");
  const [dividend, setDividend] = useState("");
  const [dividendDate, setDividendDate] = useState("");
  const [prevClose, setPrevClose] = useState("");
  const [change, setChange] = useState("");
  const [changeP, setChangeP] = useState("");

  function toggleModal() {
    setModalState(!modalState);
  }
  useEffect(() => {
    fetch(
      `${api.base}query?function=${api.function3}&symbol=${modalSymbol}&apikey=${api.key}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMarketcap(data.MarketCapitalization);
        setDividend(data.DividendYield);
        setDividendDate(data.DividendDate);
        setForwardPe(data.ForwardPE);
      })
      .catch((err) => console.log("wrong symbol"));
    ///////
    fetch(
      `${api.base}query?function=${api.function2}&symbol=${modalSymbol}&interval=5min&apikey=${api.key}`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setPrevClose(data["Global Quote"]["08. previous close"]);
        setChange(data["Global Quote"]["09. change"]);
        setChangeP(data["Global Quote"]["10. change percent"]);
      })
      .catch((err) => console.log("wrong symbol"));
  }, [api.base, api.function2, api.function3, modalSymbol, api.key]);
  return (
    <div className={`modal ${modalState === false ? "hidden" : ""}`}>
      <div className="innerModal">
        <h1 className="modalTitle">{modalSymbol}</h1>
        <div className="modalInfo">market cap:{marketcap}</div>
        <div className="modalInfo">dividend: {dividend}</div>
        <div className="modalInfo">dividend date: {dividendDate}</div>
        <div className="modalInfo">forward PE: {forwardPe}</div>
        <div className="modalInfo">previous close: {prevClose}</div>
        <div className="modalInfo">change: {change}</div>
        <div className="modalInfo">change%: {changeP}</div>
        <button onClick={toggleModal}> close</button>
      </div>
    </div>
  );
}
