import React, { useState, useEffect } from "react";

export default function Chart({ symbol }) {
  const api = {
    key: "J688E4HG3S7RD7V1",
    base: "https://www.alphavantage.co/",
    function1: "TIME_SERIES_INTRADAY",
    function2: "Global_QUOTE",
    function3: "OVERVIEW",
    function4: "TIME_SERIES_DAILY_ADJUSTED",
  };
  let xValues = [];
  let yValues = [];

  useEffect(
    fetch(
      `${api.base}query?function=${api.function4}&symbol=${symbol}&apikey=${api.key}`
    )
      .then((response) => response.json())
      .then((data) => {
        for (var day in data["Time Series (Daily)"]) {
          xValues.push(day);
          yValues.push(data["Time Series (Daily)"][day]["1. open"]);
        }
      })
      .catch(console.log("failed to load chart")),
    []
  );

  return <div className="chartContainer"></div>;
}
