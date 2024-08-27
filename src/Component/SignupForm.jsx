import React, { useState } from "react";
import FileDropDown from "./FileDropDown";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";

const SignupForm = () => {
	const [file, setFile] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		address: "",
		dateOfBirth: "",
		bio: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();

		data.append("name", `${formData.firstName} ${formData.lastName}`);
		data.append("phoneNumber", formData.phone);
		data.append("address", formData.address);
		data.append("dob", formData.dateOfBirth);
		data.append("bio", formData.bio);
		data.append("email", formData.email);
		data.append("password", formData.password);
		data.append("confirmPassword", formData.confirmPassword);
		data.append("resume", file);

		const toastId = toast.loading("Loading");
		setLoading(true);
		try {
			const response = await fetch(
				process.env.REACT_APP_BASE_URL + "signup",
				{
					method: "POST",
					body: data,
				}
			);

			if (!response.ok) {
				const errorMessage = `${response.status} - ${response.statusText}`;
				throw new Error(errorMessage);
			}

			const output = await response.json();
			toast.success(output.message);
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}

		toast.dismiss(toastId);
		setLoading(false);
		setFormData({
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			dateOfBirth: "",
			bio: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		setFile(null);
	};

	return (
		<div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className=" max-w-2xl w-full space-y-8 bg-gray-800 p-8 rounded-3xl shadow-lg">
				<div>
					<h2 className="mt-2 text-center text-2xl sm:text-3xl font-extrabold text-white">
						Sign up for an account
					</h2>
					<div className="mt-2 text-center">
						<span className="inline-block w-16 sm:w-20 h-1 bg-gray-500 rounded-full"></span>
					</div>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4  ">
						{/* Name  */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="firstName"
									className="text-sm font-medium text-gray-300"
								>
									First Name
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									required
									className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
									placeholder="Enter your first name"
									value={formData.firstName}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label
									htmlFor="lastName"
									className="text-sm font-medium text-gray-300"
								>
									Last Name
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									required
									className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
									placeholder="Enter your last name"
									value={formData.lastName}
									onChange={handleChange}
								/>
							</div>
						</div>
						{/* Phone Number */}
						<div>
							<label
								htmlFor="phone"
								className="text-sm font-medium text-gray-300"
							>
								Phone Number
							</label>
							<input
								id="phone"
								name="phone"
								type="tel"
								required
								className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								placeholder="Enter your phone number"
								value={formData.phone}
								onChange={handleChange}
							/>
						</div>
						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="text-sm font-medium text-gray-300"
							>
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								placeholder="Enter your email"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						{/* Password and Confirm Password */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{/* Password */}
							<div className="relative">
								<label
									htmlFor="password"
									className="text-sm font-medium text-gray-300"
								>
									Password
								</label>
								<input
									id="password"
									name="password"
									type={`${
										!showPassword ? "password" : "text"
									}`}
									autoComplete="new-password"
									required
									className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
									placeholder="Enter your password"
									value={formData.password}
									onChange={handleChange}
								/>
								<span
									onClick={() =>
										setShowPassword((prev) => !prev)
									}
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
							{/* Confirm Password */}
							<div className="relative">
								<label
									htmlFor="confirmPassword"
									className="text-sm font-medium text-gray-300"
								>
									Confirm Password
								</label>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={`${
										!showConfirmPassword
											? "password"
											: "text"
									}`}
									autoComplete="new-password"
									required
									className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
									placeholder="Enter your password"
									value={formData.confirmPassword}
									onChange={handleChange}
								/>
								<span
									onClick={() =>
										setShowConfirmPassword((prev) => !prev)
									}
									className="absolute right-3 top-1/2 z-[10] cursor-pointer"
								>
									{!showConfirmPassword ? (
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
						{/* Address */}
						<div>
							<label
								htmlFor="address"
								className="text-sm font-medium text-gray-300"
							>
								Address
							</label>
							<input
								id="address"
								name="address"
								type="text"
								required
								className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								placeholder="Enter your address"
								value={formData.address}
								onChange={handleChange}
							/>
						</div>
						{/* Date of Birth */}
						<div>
							<label
								htmlFor="dateOfBirth"
								className="text-sm font-medium text-gray-300"
							>
								Date of Birth
							</label>
							<input
								id="dateOfBirth"
								name="dateOfBirth"
								type="date"
								required
								className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								value={formData.dateOfBirth}
								onChange={handleChange}
							/>
						</div>
						{/* Bio */}
						<div>
							<label
								htmlFor="bio"
								className="text-sm font-medium text-gray-300"
							>
								Bio
							</label>
							<textarea
								id="bio"
								name="bio"
								rows="3"
								className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								placeholder="Tell us about yourself"
								value={formData.bio}
								onChange={handleChange}
							></textarea>
						</div>
						{/* Resume */}
						<FileDropDown file={file} setFile={setFile} />
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
							{loading ? "Loading..." : "Sign up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
