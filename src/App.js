import Navbar from "./Component/Navbar";
import Home from "./Pages/Home";
import Footer from "./Component/Footer";
import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import PageNotFound from "./Pages/PageNotFound";
import ScrollToTop from "./Component/ScrollToTop";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useRef, useState } from "react";

function App() {
	const homeRef = useRef(null);
	const contactRef = useRef(null);
	const aboutRef = useRef(null);
	const formRef = useRef(null);

	const location = useLocation();

	const isProfilePage = location.pathname === "/profile";

	const [token, setToken] = useState(
		JSON.parse(localStorage.getItem("token")) || null
	);
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);

	return (
		<div className="select-none bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-50">
			<ScrollToTop />
			<Navbar
				homeRef={homeRef}
				aboutRef={aboutRef}
				contactRef={contactRef}
				formRef={formRef}
				token={token}
				setToken={setToken}
				setUser={setUser}
			/>
			<Routes>
				<Route
					path="/"
					element={<Home homeRef={homeRef} aboutRef={aboutRef} />}
				/>
				<Route
					path="/auth"
					element={
						token ? (
							<Navigate to="/profile" replace />
						) : (
							<Auth
								
								setToken={setToken}
								setUser={setUser}
								formRef={formRef}
							/>
						)
					}
				/>
				<Route
					path="/profile"
					element={
						token ? (
							<Profile user={user} setUser={setUser} token={token} />
						) : (
							<Navigate to="/auth" replace />
						)
					}
				/>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			{!isProfilePage && (
				<Footer
					homeRef={homeRef}
					aboutRef={aboutRef}
					contactRef={contactRef}
					formRef={formRef}
					token={token}
				/>
			)}
		</div>
	);
}

export default App;
