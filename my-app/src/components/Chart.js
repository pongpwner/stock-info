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
          xValues.push(day);
          yValues.push(data["Time Series (Daily)"][day]["1. open"]);
        }
        console.log(xValues);
        setXValues(xValues);
        setYValues(yValues);
      })
      .catch(console.log("failed to load chart"));
  }, [xValues, yValues]);

  console.log(xValues);

  return (
    <div className="chartContainer">
      <div></div>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
      />
    </div>
  );
}
