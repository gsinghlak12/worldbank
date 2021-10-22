import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Graph from "./Components/GraphComponents/Graph";
import convertData from "./Components/GraphComponents/convertData";

function Search(props) {

	const [countryList, setCountryList] = useState([]);
	const [firstCountry, setFirstCountry] = useState("");
	const [firstCode, setFirstCode] = useState("");
	const [secondCountry, setSecondCountry] = useState("");
	const [secondCode, setSecondCode] = useState("");
	const [indicatorList, setIndicatorList] = useState([]);
	const [indicator, setIndicator] = useState("None");
	const [indicatorCode, setIndicatorCode] = useState("");
	const [start, setStart] = useState("1980");
	const [end, setEnd] = useState("2021");
	const [clicked, setClicked] = useState(false);
	const [dataSent, setDataSent] = useState(false);
	const [graphData, setGraphData] = useState([]);



	useEffect(() => {
		//fetch data from server side of all indicators and countries
		const fetchData = async () => {
			const response = await fetch("http://localhost:8080/api/countries");
			const json = await response.json();
			const countryData = json.countries;
			setCountryList(countryData);
			const indicatorResp = await fetch("http://localhost:8080/api/indicators");
			const indicatorJson = await indicatorResp.json();
			const indicatorData = indicatorJson.data;
			setIndicatorList(indicatorData);
		};
		fetchData();
	}, []);
	useEffect(() => {
		console.log(
			firstCountry,
			firstCode,
			secondCountry,
			secondCode,
			indicator,
			indicatorCode,
			start,
			end
		);
	});


	const validateCountry = (
		e,
		listOfItems,
		setStateCallback,
		setCodeCallback
	) => {
		let countryCode = "";
		if (
			listOfItems.some((input) => {
				countryCode = input.countrycode;
				return input.shortname === e;
			})
		) {
			setStateCallback(e);
			setCodeCallback(countryCode);
		}
	};
	const validateIndicator = (e, listOfItems) => {
		let tempCode = "";
		if (
			listOfItems.some((input) => {
				tempCode = input.seriescode;
				return input.indicatorname === e;
			})
		) {
			setIndicator(e);
			setIndicatorCode(tempCode);
		}
	};

	const yearDropDown = (startYear, endYear, type) => {
		const options = [];
		options.push(
			<option key={0 + type} value={0} disabled hidden>
				{type} year
			</option>
		);
		for (let i = startYear; i >= endYear; i--) {
			options.push(
				<option key={i + type} value={i}>
					{i}
				</option>
			);
		}
		return options;
	};

	const countryDropDown = (type) => {
		return countryList.map((input) => (
			<option key={input.shortname + type} value={input.shortname}>
				{input.shortname}
			</option>
		));
	};

	const indicatorDropDown = () => {
		let indicatorOption = indicatorList.map((input) => (
			<option key={input.indicatorname} value={input.indicatorname}>
				{input.indicatorname}
			</option>
		));
		return indicatorOption;
	};

  const addCountryButton = () => {
    if (clicked) {
      return (
        <Button
          className="mx-2"
          variant="outline-secondary"
          onClick={(e) => cleanSecondCountry(e)}
        >
          -
        </Button>
      );
    }
    return (
      <Button
        className="mx-2"
        variant="outline-secondary"
        onClick={(e) => makeSecondCountryInput(e)}
      >
        +
      </Button>
    );
  };


	const makeSecondCountryInput = (e) => {
		e.preventDefault();
		setClicked(true);
	};
	const cleanSecondCountry = (e) => {
		e.preventDefault();
		setSecondCountry("");
		setSecondCode("");
		setClicked(false);
	};

	const hideSecondCountry = () => {
		if (clicked) {
			return "btn btn-light dropdown-toggle";
		}
		return "d-none";
	};

	const addNewCountryField = () => {
		return (
			<Container className="d-flex flex-column align-items-center text-center">
				<div className={hideSecondCountry()}>
					<label className="p-2">Country 2:</label>
					<input
						className="btn btn-light dropdown-toggle m-1"
						list="countryList2"
						placeholder="Type a country..."
						autoComplete="on"
						onChange={(e) =>
							validateCountry(
								e.target.value,
								countryList,
								setSecondCountry,
								setSecondCode
							)
						}
					></input>
					<datalist id="countryList2">{countryDropDown("second")}</datalist>
				</div>
			</Container>
		);
	};


	const postSearch = async (e) => {
		const bodyResponse = {
			firstCountry: firstCountry,
			secondCountry: secondCountry,
			indicator: indicator,
		};
		const requestOptions = {
			method: "POST",
			credentials: "include",
			headers: {
				Access: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyResponse),
		};

    const response = await fetch(
      `http://localhost:8080/api/history/postSearch`,
      requestOptions
    );
    const json = await response.json();
    console.log(json);
    /*-json.Message ="history updated!"... make an alert for that :)
    thx
*/

	};
	const sendData = async () => {
		console.log("sent");
		console.log(firstCode, secondCode, indicatorCode);
		console.log(secondCode === "");
		if (firstCode === "" || indicatorCode === "") {
			return;
		}
		if (secondCode === "" && clicked === true) {
			return;
		}
		if (secondCode === "") {
			const response = await fetch(
				`http://localhost:8080/api/indicators/${indicatorCode}/countries/${firstCode}`
			);

			const json = await response.json();
			const queryData = json.data[0];

			console.log(json);
			console.log(queryData);
			setGraphData(
				convertData([queryData.years, queryData.country, queryData.value])
			);
		} else {
			const response = await fetch(
				`http://localhost:8080/api/indicators/${indicatorCode}/countries/${firstCode}/${secondCode}`
			);
			console.log(response);
			const json = await response.json();
			const query1 = json.data[0];
			const query2 = json.data[1];
			setGraphData(
				convertData([
					query1.years,
					query1.country,
					query1.value,
					query2.country,
					query2.value,
				])
			);
		}

		setDataSent(true);
	};

	const showGraph = () => {
		console.log(graphData);
		if (dataSent) {
			return <div>{<Graph title={indicator} dataset={graphData} />}</div>;
		}
	};


	return (
		<div>
			<Container className="container border border-secondary rounded d-flex shadow py-4 px-5 bg-white rounded">
				<Form className="d-flex flex-column align-items-center justify-content-center">
					<Form.Text>
						<h3 className="text-center pb-2">Search data</h3>
					</Form.Text>
					<Container className="d-flex flex-row align-items-start justify-content-center">
						<Container className="d-flex flex-row align-items-end justify-items-start">
							{addCountryButton()}
							<Container className="d-flex flex-column align-items-center text-center">
								<label className="p-2">Country 1:</label>
								<input
									className="btn btn-light dropdown-toggle m-1"
									list="countryList1"
									placeholder="Type a country..."
									onChange={(e) =>
										validateCountry(
											e.target.value,
											countryList,
											setFirstCountry,
											setFirstCode
										)
									}
								></input>
							</Container>
							<datalist id="countryList1">{countryDropDown("first")}</datalist>{" "}
							{addNewCountryField()}
						</Container>
						<Container className="d-flex flex-column align-items-center text-center">
							<label className="p-2">Indicators:</label>
							<input
								className="btn btn-light dropdown-toggle m-1"
								list="indicatorList"
								placeholder="Choose indicator..."
								onChange={(e) =>
									validateIndicator(e.target.value, indicatorList)
								}
							></input>
							<datalist id="indicatorList">{indicatorDropDown()}</datalist>
						</Container>
						<Container className="d-flex flex-column align-items-center text-center">
							<label className="p-2">Year range:</label>
							<Container className="d-flex flex-row align-items-center text-center">
								<select
									className="btn btn-light dropdown-toggle p-2 m-1"
									defaultValue={0}
									onChange={(e) => setStart(e.target.value)}
								>
									{yearDropDown(parseInt(end), 1980, "Start")}
								</select>
								<select
									className="btn btn-light dropdown-toggle p-2 m-1"
									defaultValue={0}
									onChange={(e) => setEnd(e.target.value)}
								>
									{yearDropDown(2021, parseInt(start), "End")}
								</select>
							</Container>
						</Container>
					</Container>
					<Button
						className="btn btn-secondary mt-3"
						onClick={async (e) => {
							if (props.loggedIn) {
								postSearch();
							}
							await sendData();
						}}
					>
						See results
					</Button>{" "}
				</Form>
			</Container>
			{showGraph()}
		</div>
	);

}

export default Search;
