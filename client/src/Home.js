import React, { useEffect, useState } from "react";
import convertData from "./Components/GraphComponents/convertData";
import Graph from "./Components/GraphComponents/Graph";

function Home() {
  const [years, setYears] = useState([]);
  const [country, setCountry] = useState("");
  const [value, setValue] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/indicators");
        const json = await response.json();
        console.log(json);
        const { years, country, value, title } = json;
        setYears(years);
        setCountry(country);
        setValue(value);
        setTitle(title);
        console.log(years, country, value, title);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const dataset = convertData([years, country, value]);
  console.log(dataset);
  return (
    <div>
      <Graph input="" dataset={dataset} title={title} />
    </div>
  );
}

export default Home;
