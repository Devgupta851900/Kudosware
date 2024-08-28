import React, { useState } from "react";
import toast from "react-hot-toast";

const InputField = ({ label, name, value, onChange, type = "text" }) => (
	<div className="mb-2">
		<label
			htmlFor={name}
			className="block text-sm font-medium text-gray-700"
		>
			{label}
		</label>
		<input
			type={type}
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	</div>
);

export default function EditProfileForm({ user, setOpen, setUser, token }) {
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		name: user.name,
		address: user.address,
		dob: user.dob.split("T")[0],
		bio: user.bio,
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

		setLoading(true);
		const toastId = toast.loading("Loading");
		try {
			console.log(token);
			const response = await fetch(
				`${process.env.REACT_APP_BASE_URL}/updateUser`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const output = await response.json();
			console.log(output);
			setUser(output.data);
			localStorage.setItem("user", JSON.stringify(output.data));
			toast.success("Profile updated successfully");
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error(error.message || "Failed to update profile");
		} finally {
			setLoading(false);
			toast.dismiss(toastId);
		}

		setOpen(false);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pt-16 ">
			<div className="bg-white rounded-2xl shadow-2xl px-8  max-w-2xl w-full relative">
				<h2 className="text-2xl font-bold text-gray-800 mb-2 mt-6 ">
					Edit Profile
				</h2>

				<form onSubmit={handleSubmit}>
					<InputField
						label="Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
					<InputField
						label="Address"
						name="address"
						value={formData.address}
						onChange={handleChange}
					/>
					<InputField
						label="Date of Birth"
						name="dob"
						value={formData.dob}
						onChange={handleChange}
						type="date"
					/>

					<div className="mb-4">
						<label
							htmlFor="bio"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Bio
						</label>
						<textarea
							id="bio"
							name="bio"
							value={formData.bio}
							onChange={handleChange}
							rows="8"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>

					<div className="flex justify-end space-x-4 mb-6 ">
						<button
							onClick={() => setOpen(false)}
							type="button"
							className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
						>
							Cancel
						</button>
						<button
							disabled={loading}
							type="submit"
							className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
						>
							{loading ? "Loading..." : "Save Changes"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
