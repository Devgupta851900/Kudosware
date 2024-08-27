import React, { useState } from "react";
import SignupForm from "../Component/SignupForm";
import LoginForm from "../Component/LoginForm";
import ToogleBar from "../Component/ToogleBar";

const Auth = () => {
	const [auth, setAuth] = useState("login");

	return (
		<div className=" pt-24 ">
			<ToogleBar auth={auth} setAuth={setAuth} />

			{auth === "login" ? <LoginForm /> : <SignupForm />}
		</div>
	);
};

export default Auth;
