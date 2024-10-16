import React, { useState, useEffect } from 'react';
import config from '../config/config';

function History() {
	const [history, setHistory] = useState([]);
	const [count, setCount] = useState(false);
	useEffect(() => {
		if (count === false) {
			getRows();
		}
	});

	const getRows = async () => {
		setCount(true);
		const response = await fetch(`${config.wfwApi}/history`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const json = await response.json();
		setHistory(json);
	};
	function fetchHistory() {
		if (history.length === 0) {
			return <div />;
		}

		return history.map((historicalPoint) => (
			<tr>
				<td>{historicalPoint.country1_id}</td>
				<td>{historicalPoint.country2_id}</td>
				<td>{historicalPoint.indicator_id}</td>
				<td>{historicalPoint.created_at}</td>
			</tr>
		));
	}

	return (
		<div>
			<table className='table table-striped table-bordered'>
				<thead>
					<tr>
						<th scope='col'>Country 1</th>
						<th scope='col'>Country 2</th>
						<th scope='col'>Indicator</th>
						<th scope='col'>Date</th>
					</tr>
				</thead>
				<tbody>{fetchHistory()}</tbody>
			</table>
		</div>
	);
}

export default History;
