import logo from "./logo.svg";
import "./App.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Components/LoginButton";
import LogoutButton from "./Components/LogoutButton.js";

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	return (
		<div className="App">
			{!isAuthenticated && <LoginButton />}
			{isAuthenticated && <LogoutButton />}
			{isAuthenticated}
			<header className="App-header"></header>
		</div>
	);
}

export default App;
