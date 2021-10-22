import React, { useState, useEffect } from "react";

function History() {
  const [history, setHistory] = useState();
  const [count, setCount] = useState(false);
  useEffect(() => {
    if (count === false) {
      getRows();
    }
  });

  const getRows = async () => {
    setCount(true);
    const response = await fetch(`http://localhost:8080/api/history/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    setHistory(json);
  };

  let historyRows;

  setTimeout(() => {
    historyRows = history.map((post, i) => (
      <tr>
        <td>{post[i].country1_id}</td>
        <td>{post[i].country2_id}</td>
        <td>{post[i].indicator_id}</td>
        <td>{post[i].created_at}</td>
      </tr>
    ));
  }, 1500);

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Country 1</th>
            <th scope="col">Country 2</th>
            <th scope="col">Indicator</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Poland</td>
            <td>England</td>
            <td>Birth rate</td>
            <td>20/10/21</td>
          </tr>
          <tr>
            <td>Pakistan</td>
            <td>South Africa</td>
            <td>Education rate</td>
            <td>18/10/21</td>
          </tr>
          <tr>
            <td>Spain</td>
            <td>France</td>
            <td>Coding ability</td>
            <td>16/10/21</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default History;
