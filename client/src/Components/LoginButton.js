import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginButton.css";

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();
	return (
		<div>
			<button className="btn41-43 btn-42" onClick={() => loginWithRedirect()}>
				Login/Sign-up
			</button>
		</div>
	);
};
export default LoginButton;
