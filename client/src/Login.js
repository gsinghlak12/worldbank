import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Login(props) {
	const [currentUser, setCurrentUser] = useState({
		username: "",
		password: "",
	});

	const [message, setMessage] = useState({
		error: "",
		success: "",
	});
	const [SessionCount, setSessionCount] = useState(0);

	const [sessionUpdate, setSessionUpdate] = useState(0);

	useEffect(() => {
		if (sessionUpdate == 0) {
			checkSessionExists();
		}
	});

	const handleLoginInput = (e) => {
		const { username, password } = currentUser;
		setCurrentUser({
			username,
			password,
			[e.target.id]: e.target.value,
		});

		setMessage({
			error: "",
			success: "",
		});
	};

	const postLogin = async (e) => {
		const requestOptions = {
			method: "POST",
			credentials: "include",
			headers: {
				Access: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(currentUser),
		};

		const response = await fetch(
			`http://localhost:8080/api/users/verify`,
			requestOptions
		);
		const json = await response.json();

		if (!response.ok) {
			setMessage({ error: json.status });
		} else {
			setMessage({ success: "Logged in!" });
			props.setLoggedIn(true);
			postSession();
		}
	};

	async function postSession() {
		setSessionCount(1);
		const response = await fetch(`http://localhost:8080/api/sessions`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(currentUser),
		});
	}
	async function checkSessionExists() {
		setSessionUpdate(1);
		const response = await fetch(`http://localhost:8080/api/sessions/check`, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const jsonResponse = await response.json();
		console.log(jsonResponse.loggedIn);
		if (jsonResponse.loggedIn) {
			props.setLoggedIn(true);
		} else {
			props.setLoggedIn(false);
		}
	}

	return (
		<div className="account" id="login">
			<Container>
				<Form>
					<Form.Text>
						<h3>Log into your account</h3>{" "}
					</Form.Text>
					<Form.Group controlId="formUsername">
						<Form.Label htmlFor="username">Username:</Form.Label>
						<Form.Control
							type="text"
							className="input"
							id="username"
							placeholder="Enter your username"
							value={currentUser.username}
							onChange={(e) => {
								handleLoginInput(e);
							}}
							onKeyPress={(e) => {
								props.onEnterKey(e, postLogin);
							}}
						/>
					</Form.Group>
					<br />
					<Form.Group controlId="formPassword">
						<Form.Label htmlFor="password">Password:</Form.Label>
						<Form.Control
							type="password"
							className="input"
							id="password"
							placeholder="Enter your password"
							value={currentUser.password}
							onChange={(e) => {
								handleLoginInput(e);
							}}
							onKeyPress={(e) => {
								props.onEnterKey(e, postLogin);
							}}
						/>
						<br />
						<Button
							className="btn btn-secondary m-2"
							onClick={() => {
								postLogin();
							}}
						>
							Log in
						</Button>
					</Form.Group>
				</Form>
				{message.success ? (
					<Alert variant="success">{message.success}</Alert>
				) : null}
				{message.error ? <Alert variant="danger">{message.error}</Alert> : null}
			</Container>{" "}
		</div>
	);
}

export default Login;
