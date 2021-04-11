import React from "react";

export default function Display() {
  return (
    <div className="displayContainer">
      <div className="symbol">symbol:</div>
      <div className="lastPrice">last price:</div>
      <div className="change">change:</div>
      <div className="percentChange">%change:</div>
    </div>
  );
}
