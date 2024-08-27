import React from "react";
import { FiPocket, FiArrowRight } from "react-icons/fi";
import homeImage from "../assets/home.jpg";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="pt-24 md:pt-32 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
				<div className="text-center">
					<h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
						Welcome to{" "}
						<span className="bg-gradient-to-br from-gray-700 to-gray-800 text-transparent bg-clip-text ">
							HelloWorld !!
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 font-semibold mb-8 max-w-5xl mx-auto">
						Empowering your digital journey with cutting-edge
						solutions and unparalleled expertise.
					</p>
					<Link to={"/auth"}>
						<button className="bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl">
							Get Started
						</button>
					</Link>
				</div>
				<div className="mt-16 md:mt-24 relative">
					<img
						src={homeImage}
						alt="HomeImage"
						className="rounded-lg shadow-2xl mx-auto object-contain object-center "
					/>
					<div className="absolute -bottom-6 right-1/3 bg-white p-4 rounded-lg shadow-xl hidden md:block">
						<p className="text-gray-800 font-semibold">
							Trusted by 10,000+ customers worldwide
						</p>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
				<h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
					Why Choose HelloWorld?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{[
						"Cutting-edge Technology",
						"Expert Support",
						"Scalable Solutions",
						"Data Security",
						"Customization",
						"Continuous Innovation",
					].map((feature, index) => (
						<div
							key={index}
							className="bg-white w-[80%] md:w-full mx-auto p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
						>
							<FiPocket className="text-gray-800  text-3xl mb-4" />
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								{feature}
							</h3>
							<p className="text-gray-600">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Call-to-Action Section */}
			<section className=" py-20 md:pb-32 md:pt-12 px-4 md:px-8 lg:px-16">
				<div className="max-w-5xl mx-auto text-center">
					<h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
						Ready to Transform Your Career?
					</h2>
					<p className="text-xl font-semibold text-gray-800 mb-10">
						Join thousands of satisfied customers and take your
						career to the next level with HelloWorld.
					</p>
					<Link to={"/auth"}>
						<button className="bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg hover:shadow-xl inline-flex items-center">
							Get Started Now
							<FiArrowRight className="ml-2" />
						</button>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default Home;
