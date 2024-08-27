/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef } from "react";

export default function FileDropDown({ file, setFile }) {
	const fileInputRef = useRef(null);

	const handleFileChange = (event) => {
		if (event.target.files[0]) {
			setFile(event.target.files[0]);
		}
	};

	const handleDrop = useCallback((event) => {
		event.preventDefault();
		if (event.dataTransfer.files[0]) {
			setFile(event.dataTransfer.files[0]);
		}
	}, []);

	const handleDragOver = useCallback((event) => {
		event.preventDefault();
	}, []);

	const handleClick = () => {
		fileInputRef.current.click();
	};

	const handleRemove = (e) => {
		e.stopPropagation();
		setFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="mt-4">
			<label
				htmlFor="resume"
				className="text-sm font-medium text-gray-300"
			>
				Resume
			</label>
			<div
				onClick={handleClick}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				className={`mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 ${
					file ? "border-purple-500" : "border-gray-600 border-dashed"
				} rounded-md hover:border-purple-500 transition-colors duration-300 cursor-pointer`}
			>
				<div className="space-y-1 text-center">
					{file ? (
						<div className="text-purple-500">
							<svg
								className="mx-auto h-12 w-12"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<p className="mt-2 text-sm">{file.name}</p>
							<button
								onClick={handleRemove}
								className="mt-2 text-xs text-red-500 hover:text-red-600"
							>
								Remove file
							</button>
						</div>
					) : (
						<>
							<svg
								className="mx-auto h-12 w-12 text-gray-400"
								stroke="currentColor"
								fill="none"
								viewBox="0 0 48 48"
								aria-hidden="true"
							>
								<path
									d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<div className="flex text-sm text-gray-400">
								<span className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-purple-500 hover:text-purple-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
									<span className="px-2">Upload a file</span>
								</span>
								<p className="pl-1">or drag and drop</p>
							</div>
							<p className="text-xs text-gray-400">
								PDF, DOC, DOCX up to 10MB
							</p>
						</>
					)}
				</div>
			</div>
			<input
				ref={fileInputRef}
				id="resume"
				name="resume"
				type="file"
				accept=".pdf,.doc,.docx"
				className="hidden"
				onChange={handleFileChange}
			/>
		</div>
	);
}
