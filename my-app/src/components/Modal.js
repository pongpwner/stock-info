import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Chart from "./Chart.js";
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
  const [companyName, setCompanyName] = useState("");

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
        setCompanyName(data.Name);
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
  if (modalState === false) return null;
  return ReactDom.createPortal(
    <div className="modal">
      <div className="innerModal">
        <button className="closeModal" onClick={toggleModal}>
          {" "}
          close
        </button>
        <h1 className="modalTitle">{modalSymbol}</h1>
        <div className="modalInfo">{companyName}</div>
        <div className="modalInfo">previous close: {prevClose}</div>
        <div className="modalInfo">
          change:{" "}
          <span className={`${change > 0 ? "positive" : "negative"}`}>
            {change}
          </span>
        </div>
        <div className="modalInfo">
          change%:{" "}
          <span className={`${change > 0 ? "positive" : "negative"}`}>
            {changeP}
          </span>
        </div>
        <div className="modalInfo">market cap:{marketcap}</div>
        <div className="modalInfo">forward PE: {forwardPe}</div>
        <div className="modalInfo">dividend: {dividend}</div>
        <div className="modalInfo">dividend date: {dividendDate}</div>

        <Chart symbol={modalSymbol} />
      </div>
    </div>,
    document.getElementById("portal")
  );
}
//
