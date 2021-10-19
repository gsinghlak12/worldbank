import React, { useState, useEffect } from "react";

function Search() {
  const [search, setSearch] = useState({
    countries: [],
    indicator: "",
    start: null,
    end: null,
  });

  return (
    <div>
      <h3>Search data</h3>
      <label>Countries:</label>
      <input className="input"></input>
      <button>+</button>
      <br />
      <label>Indicators:</label>
      <input className="input"></input>
      <label>Year range:</label>
      <option key={1} value={1950}>
        {2021}
      </option>
      <button>Search</button>
    </div>
  );
}

export default Search;
