import React, { useState } from "react";
import { Mail, Phone, MapPin, Calendar, FileText } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import EditProfileModal from "../Component/EditProfileModal";

const formatDate = (dateString) => {
	if (!dateString) return "Not provided";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const InfoItem = ({ icon, label, value }) => (
	<div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
		<div className="text-blue-500">{icon}</div>
		<div>
			<p className="text-sm font-medium text-gray-600">{label}</p>
			<p className="text-gray-800">{value}</p>
		</div>
	</div>
);

export default function Profile({ user, setUser, token }) {
	const [open, setOpen] = useState(false);

	return (
		<div className=" relative  min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4 pt-16 ">
			{open ? (
				<EditProfileModal
					user={user}
					setUser={setUser}
					setOpen={setOpen}
					token={token}
				/>
			) : (
				<div className="relative bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-4xl w-full">
					<button
						onClick={() => {
							setOpen(true);
						}}
						className="absolute z-20 top-4 right-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
						aria-label="Edit profile"
					>
						<FiEdit size={20} />
					</button>

					<div className="flex flex-col items-center mb-8">
						<div className="w-32 aspect-square sm:w-40 sm:h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-gray-800 text-3xl sm:text-5xl font-bold mb-2">
							{user.name
								? user.name.charAt(0).toUpperCase()
								: "?"}
						</div>

						<h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-2">
							{user.name}
						</h1>
						<p className="text-gray-600 text-center font-semibold w-[95%] ">
							{user.bio}
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
						<InfoItem
							icon={<Mail />}
							label="Email"
							value={user.email}
						/>
						<InfoItem
							icon={<Phone />}
							label="Phone"
							value={user.phoneNumber}
						/>
						<InfoItem
							icon={<MapPin />}
							label="Address"
							value={user.address}
						/>
						<InfoItem
							icon={<Calendar />}
							label="Date of Birth"
							value={formatDate(user.dob)}
						/>
					</div>

					<div className="flex justify-center">
						<a
							href={user.resume}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-300 shadow-lg"
						>
							<FileText className="mr-2" />
							View Resume
						</a>
					</div>
				</div>
			)}
		</div>
	);
}
