import React, { useState, useEffect } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Graph from '../components/GraphComponents/Graph';
import convertData from '../components/GraphComponents/convertData';
import config from '../config/config';

function Search(props) {
	const [countryList, setCountryList] = useState([]);
	const [firstCountry, setFirstCountry] = useState('');
	const [firstCode, setFirstCode] = useState('');
	const [secondCountry, setSecondCountry] = useState('');
	const [secondCode, setSecondCode] = useState('');
	const [indicatorList, setIndicatorList] = useState([]);
	const [indicator, setIndicator] = useState('');
	const [indicatorCode, setIndicatorCode] = useState('');
	const [start, setStart] = useState('1980');
	const [end, setEnd] = useState('2021');
	const [clicked, setClicked] = useState(false);
	const [dataSent, setDataSent] = useState(false);
	const [graphData, setGraphData] = useState([]);
	const [message, setMessage] = useState({
		error: '',
	});

	useEffect(() => {
		//fetch data from server side of all indicators and countries
		const fetchData = async () => {
			try {
				const response = await fetch('${config.wfwApi}/countries');
				const json = await response.json();
				const countryData = json.countries;
				setCountryList(countryData);
				const indicatorResp = await fetch('${config.wfwApi}/indicators');
				const indicatorJson = await indicatorResp.json();
				const indicatorData = indicatorJson.data;
				setIndicatorList(indicatorData);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const resetMessage = () => {
		setMessage({
			error: '',
		});
	};

	const validateCountry = (e, listOfItems, setStateCallback, setCodeCallback) => {
		let countryCode = '';
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
		let tempCode = '';
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
				<Button className='mx-2 my-1' variant='outline-secondary' onClick={(e) => cleanSecondCountry(e)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						fill='currentColor'
						class='bi bi-dash'
						viewBox='0 0 16 16'
					>
						<path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z' />
					</svg>
				</Button>
			);
		}
		return (
			<Button className='mx-2 my-1' variant='outline-secondary' onClick={(e) => makeSecondCountryInput(e)}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='20'
					height='20'
					fill='currentColor'
					class='bi bi-plus'
					viewBox='0 0 16 16'
				>
					<path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
				</svg>
			</Button>
		);
	};

	const makeSecondCountryInput = (e) => {
		e.preventDefault();
		setClicked(true);
	};
	const cleanSecondCountry = (e) => {
		e.preventDefault();
		setSecondCountry('');
		setSecondCode('');
		setClicked(false);
	};

	const hideSecondCountry = () => {
		if (clicked) {
			return 'input';
		}
		return 'd-none';
	};

	const addNewCountryField = () => {
		return (
			<Container className='d-flex flex-column align-items-center text-center'>
				<div className={hideSecondCountry()}>
					<label className='p-2'>Country 2:</label>
					<input
						className='btn btn-light dropdown-toggle m-1 px-2'
						list='countryList2'
						placeholder='Type a country...'
						autoComplete='on'
						onChange={(e) => validateCountry(e.target.value, countryList, setSecondCountry, setSecondCode)}
						onClick={resetMessage}
					></input>
					<datalist id='countryList2'>{countryDropDown('second')}</datalist>
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
			method: 'POST',
			credentials: 'include',
			headers: {
				Access: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyResponse),
		};

		try {
			const response = await fetch(`${config.wfwApi}/history`, requestOptions);
			const json = await response.json();
			console.log(json);
		} catch (error) {
			console.log(error);
		}
	};
	const sendData = async () => {
		if (firstCode === '' || indicatorCode === '') {
			setMessage({ error: 'Please choose a country and indicator to search' });
			return;
		}
		if (secondCode === '' && clicked === true) {
			setMessage({ error: 'Please choose a second country' });
			return;
		}
		if (secondCode === '') {
			try {
				const response = await fetch(`${config.wfwApi}/indicators/${indicatorCode}/countries/${firstCode}`);
				const json = await response.json();
				if (json.data.length > 1) {
					const womenData = json.data[0];
					const menData = json.data[1];
					setGraphData(convertData([womenData.years, 'Women', womenData.value, 'Men', menData.value]));
					setDataSent(true);
					if (props.loggedIn) {
						postSearch();
					}
				} else {
					const queryData = json.data[0];
					setGraphData(convertData([queryData.years, queryData.country, queryData.value]));
					setDataSent(true);
					if (props.loggedIn) {
						postSearch();
					}
				}
			} catch (error) {
				setMessage({
					error: 'No data for the chosen indicator. Please choose another.',
				});
			}
		} else {
			try {
				const response = await fetch(
					`${config.wfwApi}/indicators/${indicatorCode}/countries/${firstCode}/${secondCode}`
				);
				const json = await response.json();
				const query1 = json.data[0];
				const query2 = json.data[1];
				setGraphData(convertData([query1.years, query1.country, query1.value, query2.country, query2.value]));
				console.log(json);
				setDataSent(true);
				if (props.loggedIn) {
					postSearch();
				}
			} catch (error) {
				setMessage({
					error: 'No data for the chosen indicator. Please choose another.',
				});
			}
		}
	};

	const showGraph = () => {
		if (dataSent) {
			return <div className='m-5'>{<Graph title={indicator} dataset={graphData} />}</div>;
		}
	};

	return (
		<div>
			<Container className='d-flex flex-column justify-content-center align-content-center'>
				<Container className='d-flex vh-85 border border-secondary rounded align-items-center justify-content-center shadow py-4 px-5 mt-5 bg-white rounded'>
					<Form className='d-flex flex-column overflow-auto align-items-center justify-content-center'>
						<Form.Text>
							<h3 className='text-center pb-2'>Search data</h3>
						</Form.Text>
						<Container className='d-flex flex-row align-items-start justify-content-center'>
							<Container className='d-flex flex-row align-items-end justify-items-start'>
								{addCountryButton()}
								<Container className='d-flex flex-column align-items-center text-center'>
									<label className='p-2'>Country 1:</label>
									<input
										className='btn btn-light dropdown-toggle m-1 px-2'
										list='countryList1'
										placeholder='Type a country...'
										onChange={(e) =>
											validateCountry(e.target.value, countryList, setFirstCountry, setFirstCode)
										}
										onClick={resetMessage}
									></input>
								</Container>

								{addNewCountryField()}
								<datalist id='countryList1'>{countryDropDown('first')}</datalist>
							</Container>
							<Container className='d-flex flex-column align-items-center text-center'>
								<label className='p-2'>Indicator:</label>
								<input
									className='btn btn-light dropdown-toggle m-1 w-100s'
									list='indicatorList'
									placeholder='Choose indicator...'
									onChange={(e) => validateIndicator(e.target.value, indicatorList)}
									onClick={resetMessage}
								></input>
								<datalist id='indicatorList'>{indicatorDropDown()}</datalist>
							</Container>
						</Container>
						<Button
							className='btn btn-secondary mt-3'
							onClick={async (e) => {
								await sendData();
							}}
						>
							See results
						</Button>
						{message.error ? (
							<Alert className='mt-4' variant='danger'>
								{message.error}
							</Alert>
						) : null}
					</Form>
				</Container>
				<Container>{showGraph()}</Container>
			</Container>
		</div>
	);
}

export default Search;
