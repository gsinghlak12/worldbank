import React, { useState, useEffect } from "react";

function History() {
  const getRows = async () => {
    const response = await fetch(`http://localhost:8080/api/history/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    const rows = json.rows;

    console.log(json);

    // for (let i in response.rows) {
    //   return (
    //     <tr>
    //       <td>{rows[i].country1_id}</td>
    //       <td>{rows[i].country2_id}</td>
    //       <td>{rows[i].indicator_id}</td>
    //       <td>{rows[i].created_at}</td>
    //     </tr>
    //   );
    // }
  };

  return (
    <div>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Country 1</th>
            <th scope="col">Country 2</th>
            <th scope="col">Indicator</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {getRows()}
          <tr>
            <th scope="row">KASIA95</th>
            <td>Poland</td>
            <td>England</td>
            <td>Birth rate</td>
            <td>20/10/21</td>
          </tr>
          <tr>
            <th scope="row">SigmaLab101</th>
            <td>Pakistan</td>
            <td>South Africa</td>
            <td>Education rate</td>
            <td>18/10/21</td>
          </tr>
          <tr>
            <th scope="row">ChrisOwen1</th>
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
