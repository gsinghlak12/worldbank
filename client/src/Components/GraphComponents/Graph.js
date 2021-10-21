import React from "react";
import "./Graph.css";
import { Line } from "react-chartjs-2";

function lineGraph(inputTitle, dataset) {
  console.log(inputTitle);
  console.log(dataset);
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

function Graph(props) {
  return lineGraph(props.title, props.dataset);
}

export default Graph;
