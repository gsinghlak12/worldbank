import React from "react";
import "./Graph.css";
import { Line, Bar } from "react-chartjs-2";

function lineGraph(inputTitle, dataset) {
  return (
    <Line
      data={dataset}
      options={{
        plugins: {
          title: {
            display: true,
            text: inputTitle,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        },
      }}
    />
  );
}

function barGraph(inputTitle, dataset) {
  return (
    <Bar
      data={dataset}
      options={{
        plugins: {
          title: {
            display: true,
            text: inputTitle,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        },
      }}
    />
  );
}

function Graph(props) {
  switch (props.input.toLowerCase()) {
    case "bar":
      return barGraph(props.title, props.dataset);

    default:
      return lineGraph(props.title, props.dataset);
  }
}

export default Graph;
