import React, { useState, useEffect } from "react";

function History() {
  // const getRows = () => {
  //   const rows = {
  //     1: {
  //       username: "Kasia95",
  //       country1: "Poland",
  //       country2: "England",
  //       indicator: "Birth rate",
  //       date: "20/10/21",
  //     },
  //   };

  //   for (user in rows) {
  //     return (
  //       <tr>
  //         <th scope="row">{user.username}</th>
  //         <td>{user.country1}</td>
  //         <td>{user.country2}</td>
  //         <td>{user.indicator}</td>
  //         <td>{user.date}</td>
  //       </tr>
  //     );
  //   }
  // };

  return (
    <div>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Country 1</th>
            <th scope="col">Country 2</th>
            <th scope="col">Indicator</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {/* {getRows()} */}
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
