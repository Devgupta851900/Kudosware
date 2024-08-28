import React, { useState, useEffect, useRef } from "react";
import cross from "../assets/cross-23.svg";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({
	homeRef,
	aboutRef,
	contactRef,
	formRef,
	token,
	setToken,
	setUser,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const menuRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`fixed select-none top-0 left-0 w-full ${
				isScrolled ? "bg-white shadow-lg" : "bg-transparent"
			} text-gray-600 z-50 transition-all duration-300`}
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between py-4">
					<Link to={"/"}>
						<div className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 text-transparent bg-clip-text">
							Kudosware
						</div>
					</Link>

					{/* Hamburger menu for mobile */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="focus:outline-none text-gray-800 hover:text-gray-900 transition duration-300"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>

					{/* Desktop menu */}
					<ul className="hidden md:flex items-center space-x-8 text-lg">
						<li>
							<div
								onClick={() => {
									if (!homeRef.current) {
										navigate("/");
										return;
									}
									homeRef.current.scrollIntoView({
										behavior: "smooth",
									});
								}}
								className="font-semibold text-gray-800 tracking-wide cursor-pointer hover:text-gray-900 transition duration-300 relative group"
							>
								Home
								<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
							</div>
						</li>
						{matchPath({ path: "/" }, location.pathname) && (
							<li>
								<div
									onClick={() => {
										aboutRef.current.scrollIntoView({
											behavior: "smooth",
										});
									}}
									className="font-semibold text-gray-800 tracking-wide cursor-pointer hover:text-gray-900 transition duration-300 relative group"
								>
									About
									<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
								</div>
							</li>
						)}
						<li>
							<div
								onClick={() => {
									contactRef.current.scrollIntoView({
										behavior: "smooth",
									});
								}}
								className="font-semibold text-gray-800 tracking-wide cursor-pointer hover:text-gray-900 transition duration-300 relative group"
							>
								Contact
								<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
							</div>
						</li>
						{token ? (
							<li className=" flex gap-4 ">
								{location.pathname === "/profile" || (
									<button
										onClick={() => {
											navigate("/profile");
										}}
										className="bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl"
									>
										Go to Profile
									</button>
								)}
								<button
									onClick={() => {
										setToken(null);
										setUser(null);
										localStorage.removeItem("token");
										localStorage.removeItem("user");
										navigate("/");
									}}
									className="bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl"
								>
									Log Out
								</button>
							</li>
						) : (
							<li>
								<button
									onClick={() => {
										if (
											matchPath(
												{ path: "/auth" },
												location.pathname
											) &&
											formRef.current
										) {
											formRef.current.scrollIntoView({
												behavior: "smooth",
											});
											return;
										}
										navigate("/auth");
									}}
									className="bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl"
								>
									Get Started
								</button>
							</li>
						)}
					</ul>
				</div>

				{/* Mobile menu */}
				<div
					ref={menuRef}
					className={`fixed top-0 right-0 h-fit w-[50%] rounded-xl my-4  max-w-sm bg-white shadow-2xl transform ${
						isOpen ? "translate-x-0  mx-8 " : "translate-x-full"
					} transition-all duration-300 ease-in-out md:hidden z-50`}
				>
					<div className="py-6 px-6">
						<div className="flex justify-between items-center mb-8">
							<Link to={"/"}>
								<div className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 text-transparent bg-clip-text">
									Kudosware
								</div>
							</Link>
							<button
								onClick={() => setIsOpen(false)}
								className="p-2 rounded-full hover:bg-purple-100 transition duration-300 ease-in-out"
							>
								<img
									src={cross}
									alt="close"
									className="w-6 text-gray-800"
								/>
							</button>
						</div>
						<ul className="space-y-2 flex flex-col justify-center items-center ">
							<li>
								<div
									onClick={() => {
										setIsOpen(false);
										if (!homeRef.current) {
											navigate("/");
											return;
										}
										homeRef.current.scrollIntoView({
											behavior: "smooth",
										});
									}}
									className="block py-3 px-4 text-lg font-bold tracking-wide rounded-lg text-gray-800  transition duration-300 ease-in-out cursor-pointer"
								>
									Home
								</div>
							</li>
							{matchPath({ path: "/" }, location.pathname) && (
								<li>
									<div
										onClick={() => {
											aboutRef.current.scrollIntoView({
												behavior: "smooth",
											});
											setIsOpen(false);
										}}
										className="block py-3 px-4 text-lg font-bold tracking-wide rounded-lg text-gray-800  transition duration-300 ease-in-out cursor-pointer"
									>
										About
									</div>
								</li>
							)}
							<li>
								<div
									onClick={() => {
										contactRef.current.scrollIntoView({
											behavior: "smooth",
										});
										setIsOpen(false);
									}}
									className="block py-3 px-4 text-lg font-bold tracking-wide rounded-lg text-gray-800  transition duration-300 ease-in-out cursor-pointer"
								>
									Contact
								</div>
							</li>
							{token ? (
								<li>
									<button
										onClick={() => {
											navigate("/profile");
											setIsOpen(false);
										}}
										className="bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl"
									>
										Go to Profile
									</button>
								</li>
							) : (
								<li className=" w-full ">
									<Link to={"/auth"}>
										<button
											onClick={() => {
												if (
													matchPath(
														{ path: "/auth" },
														location.pathname
													) &&
													formRef.current
												) {
													formRef.current.scrollIntoView(
														{
															behavior: "smooth",
														}
													);
													return;
												}
												navigate("/auth");
												setIsOpen(false);
											}}
											className="bg-gray-800 text-white w-full px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl"
										>
											Get Started
										</button>
									</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
