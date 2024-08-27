import React, { useState, useEffect, useRef } from "react";
import cross from "../assets/cross-23.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const menuRef = useRef(null);

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
					<div className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 text-transparent bg-clip-text">
						HelloWorld
					</div>

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
						{["Home", "About Us", "Contact Us"].map(
							(item, index) => (
								<li key={index}>
									<div className="font-semibold text-gray-800 tracking-wide cursor-pointer hover:text-gray-900 transition duration-300 relative group">
										{item}
										<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
									</div>
								</li>
							)
						)}
						<li>
							<Link to={"/auth"}>
								<button className="bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl">
									Get Started
								</button>
							</Link>
						</li>
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
							<div className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 text-transparent bg-clip-text">
								HelloWorld
							</div>
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
							{["Home", "About Us", "Contact Us"].map(
								(item, index) => (
									<li key={index}>
										<div className="block py-3 px-4 text-lg font-bold tracking-wide rounded-lg text-gray-800 hover:bg-gray-900 transition duration-300 ease-in-out cursor-pointer">
											{item}
										</div>
									</li>
								)
							)}
							<li className=" w-full ">
								<Link to={"/auth"}>
									<button className="bg-gray-800 text-white w-full px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl">
										Get Started
									</button>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
