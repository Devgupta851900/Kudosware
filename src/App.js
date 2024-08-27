import Navbar from "./Component/Navbar";
import Home from "./Pages/Home";
import Footer from "./Component/Footer";
import Auth from "./Pages/Auth";
import { Route, Routes } from "react-router-dom";
function App() {
	return (
		<div className=" select-none bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-50 ">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth" element={<Auth />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
