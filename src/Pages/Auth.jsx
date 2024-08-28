import React, { useState } from "react";
import SignupForm from "../Component/SignupForm";
import LoginForm from "../Component/LoginForm";
import ToogleBar from "../Component/ToogleBar";

const Auth = ({  formRef, setToken, setUser }) => {
	const [auth, setAuth] = useState("");

	return (
		<div ref={formRef} className=" pt-24 ">
			<ToogleBar auth={auth} setAuth={setAuth} />
			{auth === "login" ? (
				<LoginForm
					setToken={setToken}
					setUser={setUser}
					setAuth={setAuth}
				/>
			) : (
				<SignupForm setAuth={setAuth} />
			)}
		</div>
	);
};

export default Auth;
