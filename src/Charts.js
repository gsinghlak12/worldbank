import React, { useEffect, useState } from 'react';
import convertData from './Components/GraphComponents/convertData';
import Graph from './Components/GraphComponents/Graph';
import config from './config';

function Charts() {
	const [years, setYears] = useState([]);
	const [country, setCountry] = useState('');
	const [value, setValue] = useState([]);
	const [title, setTitle] = useState('');
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${config.wfwApi}/indicators`);
				const json = await response.json();
				const { years, country, value, title } = json;
				setYears(years);
				setCountry(country);
				setValue(value);
				setTitle(title);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);
	const dataset = convertData([years, country, value]);
	return (
		<div>
			<Graph input='' dataset={dataset} title={title} />
		</div>
	);
}

export default Charts;
