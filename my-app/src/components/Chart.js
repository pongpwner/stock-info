import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

export default function Chart({ symbol }) {
  const api = {
    key: "J688E4HG3S7RD7V1",
    base: "https://www.alphavantage.co/",
    function1: "TIME_SERIES_INTRADAY",
    function2: "Global_QUOTE",
    function3: "OVERVIEW",
    function4: "TIME_SERIES_DAILY_ADJUSTED",
  };
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  let xvalues = [];
  let yvalues = [];

  useEffect(() => {
    fetch(
      `${api.base}query?function=${api.function4}&symbol=${symbol}&apikey=${api.key}`
    )
      .then((response) => response.json())
      .then((data) => {
        for (var day in data["Time Series (Daily)"]) {
          xvalues.push(day);
          yvalues.push(data["Time Series (Daily)"][day]["1. open"]);
        }
      })
      .then(() => {
        setXValues(xvalues);
        setYValues(yvalues);
      })
      .catch(console.log("failed to load chart"));
  }, [symbol]);

  return (
    <div className="chartContainer">
      <div></div>
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 500, height: 420, title: symbol }}
      />
    </div>
  );
}
