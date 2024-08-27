import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const toastId = toast.loading("Loading");
		setLoading(true);
		try {
			const response = await fetch(
				process.env.REACT_APP_BASE_URL + "login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				const errorMessage = `${response.status} - ${response.statusText}`;
				throw new Error(errorMessage);
			}
			const data = await response.json();
			console.log(data);
			toast.success(data.message);
		} catch (error) {
			console.error("Error:", error);
			toast.error(error.message);
		}
		toast.dismiss(toastId);
		setLoading(false);
	};

	return (
		<div className="flex items-center justify-center  pt-12 pb-24 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-lg sm:max-w-xl space-y-8 bg-gray-800 p-6 sm:p-10 rounded-xl shadow-2xl transform transition-all duration-300">
				<div>
					<h2 className="mt-2 text-center text-2xl sm:text-3xl font-extrabold text-white">
						Login to your account
					</h2>
					<div className="mt-2 text-center">
						<span className="inline-block w-16 sm:w-20 h-1 bg-gray-500 rounded-full"></span>
					</div>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm space-y-4">
						<div>
							<label
								htmlFor="email-address"
								className="text-gray-300 text-sm font-medium mb-1 block"
							>
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:z-10 text-sm sm:text-base bg-gray-700 transition-all duration-200"
								placeholder="Enter your email"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="relative">
							<label
								htmlFor="password"
								className="text-gray-300 text-sm font-medium mb-1 block"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type={`${!showPassword ? "password" : "text"}`}
								autoComplete="current-password"
								required
								className="appearance-none  block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:z-10 text-sm sm:text-base bg-gray-700 transition-all duration-200"
								placeholder="Enter your password"
								value={formData.password}
								onChange={handleChange}
							/>
							<span
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute right-3 top-1/2 z-[10] cursor-pointer"
							>
								{!showPassword ? (
									<AiOutlineEyeInvisible
										fontSize={24}
										fill="#AFB2BF"
									/>
								) : (
									<AiOutlineEye
										fontSize={24}
										fill="#AFB2BF"
									/>
								)}
							</span>
						</div>
					</div>

					<div>
						<button
							disabled={loading}
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-gray-900 bg-gray-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg
									className="h-5 w-5 text-gray-700 group-hover:text-gray-900"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							{loading ? "Loading..." : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
