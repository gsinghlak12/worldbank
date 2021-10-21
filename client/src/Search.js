import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Search(props) {
	const [countryList, setCountryList] = useState([]);
	const [firstCountry, setFirstCountry] = useState("");
	const [secondCountry, setSecondCountry] = useState("");
	const [indicatorList, setIndicatorList] = useState([]);
	const [indicator, setIndicator] = useState("None");
	const [start, setStart] = useState("1980");
	const [end, setEnd] = useState("2021");
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		//fetch data from server side of all indicators and countries
		setCountryList(
			[
				"America",
				"Japan",
				"England",
				"Korea",
				"India",
				"Pakistan",
				"Norway",
				"Switzerland",
				"Brazil",
				"Mexico",
				"Canada",
				"Denmark",
				"France",
				"Portugal",
				"Vietnam",
				"Hungary",
				"Qatar",
			].sort()
		); //placeholder data
		setIndicatorList(
			[
				"Life",
				"Death",
				"Spirit",
				"Wind",
				"Earth",
				"Time",
				"Fire",
				"Water",
				"Magic",
				"List",
			].sort()
		); //placeholder data
	}, []);
	useEffect(() => {
		console.log(firstCountry, secondCountry, indicator, start, end);
	});

	const validateInput = (e, listOfItems, callback) => {
		if (listOfItems.some((input) => input === e)) {
			callback(e);
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
			<option key={input + type} value={input}>
				{input}
			</option>
		));
	};

	const indicatorDropDown = () => {
		let indicatorOption = indicatorList.map((input) => (
			<option key={input} value={input}>
				{input}
			</option>
		));
		indicatorOption.unshift(
			<option key={"None"} value="None">
				{"None"}
			</option>
		);
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
			<div>
				<input
					className={hideSecondCountry()}
					list="countryList2"
					placeholder="Type a country..."
					autoComplete="on"
					onChange={(e) =>
						validateInput(e.target.value, countryList, setSecondCountry)
					}
				></input>
				<datalist id="countryList2">{countryDropDown("second")}</datalist>
			</div>
		);
	};

	///posting Search
	console.log(firstCountry, secondCountry, indicator);
	const postSearch = async (e) => {
		const bodyResponse = {
			user_id: 38,
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
	};
	return (
		<div>
			<Container className="container border border-secondary rounded d-flex align-content-center justify-content-center shadow p-3 bg-white rounded">
				<Form className="d-flex flex-column align-items-center">
					<Row>
						<Form.Text>
							<h3>Search data</h3>{" "}
						</Form.Text>
					</Row>
					<Row>
						<Col md>
							<label>Countries:</label>
							<input
								class="btn btn-light dropdown-toggle"
								list="countryList1"
								placeholder="Type a country..."
								onChange={(e) =>
									validateInput(e.target.value, countryList, setFirstCountry)
								}
							></input>
							{addCountryButton()}
							{addNewCountryField()}
							<datalist id="countryList1">{countryDropDown("first")}</datalist>
						</Col>
						<Col md>
							<label>Indicators:</label>
							<input
								className="input"
								list="indicatorList"
								placeholder="Choose indicator..."
								onChange={(e) =>
									validateInput(e.target.value, indicatorList, setIndicator)
								}
							></input>
							<datalist id="indicatorList">{indicatorDropDown()}</datalist>
						</Col>
						<Col md>
							<label>Year range:</label>
							<select
								className="input"
								defaultValue={0}
								onChange={(e) => setStart(e.target.value)}
							>
								{yearDropDown(parseInt(end), 1980, "start")}
							</select>
							<select
								className="input"
								defaultValue={0}
								onChange={(e) => setEnd(e.target.value)}
							>
								{yearDropDown(2021, parseInt(start), "end")}
							</select>
						</Col>
					</Row>
					<Button
						onClick={(e) => {
							// e.preventDefault();
							if (props.loggedIn) {
								postSearch();
							}
						}}
						className="btn btn-secondary m-2"
					>
						See results
					</Button>{" "}
				</Form>{" "}
			</Container>
		</div>
	);

}

export default Search;
