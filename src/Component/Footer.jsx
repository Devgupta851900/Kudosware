import React from "react";
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { useNavigate, matchPath, useLocation } from "react-router-dom";

const Footer = ({ homeRef, contactRef, aboutRef, formRef, token }) => {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<footer
			ref={contactRef}
			className="bg-transparent  text-textgray-800 py-12 px-4 md:px-8 lg:px-16"
		>
			<div className="max-w-7xl border-t border-gray-700 mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-8">
					<div>
						<h3 className="text-2xl font-bold mb-4">HelloWorld</h3>
						<p className="text-gray-600 font-semibold ">
							Empowering your digital journey with cutting-edge
							solutions and unparalleled expertise.
						</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">
							Quick Links
						</h4>
						<ul className="space-y-2">
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
									className="text-gray-600 font-semibold hover:text-gray-700 transition duration-300"
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
										}}
										className="text-gray-600 font-semibold hover:text-gray-700 transition duration-300"
									>
										About
									</div>
								</li>
							)}
							<li>
								<div className="text-gray-600 font-semibold hover:text-gray-700 transition duration-300">
									Contact
								</div>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">
							Contact Us
						</h4>
						<p className="text-gray-600 font-semibold">
							123 Tech Street,
						</p>
						<p className="text-gray-600 font-semibold">
							Address, XYZ 94000
						</p>
						<p className="text-gray-600 font-semibold">
							Phone: (123) 456-7890
						</p>
						<p className="text-gray-600 font-semibold">
							Email: info@xyz.com
						</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">
							Follow Us
						</h4>
						<div className="flex space-x-4 mb-4">
							<div className="text-gray-600 font-semibold hover:text-gray-700 transition duration-300">
								<FiTwitter size={24} />
							</div>
							<div className="text-gray-600 font-semibold hover:text-gray-700 transition duration-300">
								<FiFacebook size={24} />
							</div>
							<div className="text-gray-600 font-semibold hover:text-gray-700 transition duration-300">
								<FiInstagram size={24} />
							</div>
							<div className="text-gray-600 font-semibold hover:text-gray-700 transition duration-300">
								<FiLinkedin size={24} />
							</div>
						</div>
						<div>
							{token ? (
								<button
									onClick={() => {
										navigate("/profile");
									}}
									className="bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl"
								>
									Go to Profile
								</button>
							) : (
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
									className="bg-gray-800  text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl"
								>
									Get Started
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="border-t border-gray-700 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-600 font-semibold text-sm mb-4 md:mb-0">
							© 2024 Helloworld. All rights reserved.
						</p>
						<div className="flex space-x-4">
							<div
								href="#"
								className="text-gray-600 font-semibold hover:text-gray-700 text-sm transition duration-300"
							>
								Privacy Policy
							</div>
							<div
								href="#"
								className="text-gray-600 font-semibold hover:text-gray-700 text-sm transition duration-300"
							>
								Terms of Service
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
