import { useAuth0 } from "@auth0/auth0-react";
import "./LogoutButton.css";

const LogoutButton = () => {
	const { logout } = useAuth0();
	return (
		<button
			className="btn41-43 btn-42"
			onClick={() => logout({ returnTo: window.location.origin })}
		>
			Log Out!
		</button>
	);
};
export default LogoutButton;
