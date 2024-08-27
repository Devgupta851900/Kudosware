import React from "react";

const ToogleBar = ({ auth, setAuth }) => {
	return (
		<div className="w-[50%] sm:w-[40%] lg:w-[30%] relative mx-auto rounded-full flex justify-center items-center font-bold  text-sm md:text-lg uppercase bg-gray-800 text-white  ">
			<div
				className={` w-full text-center px-4 py-4 z-20 ${
					auth === "login" && " text-gray-800 "
				}  `}
				onClick={() => {
					setAuth("login");
				}}
			>
				Login
			</div>
			<div
				className={` w-full text-center px-4 py-4 z-20 ${
					auth !== "login" && " text-gray-800 "
				}  `}
				onClick={() => {
					setAuth("signup");
				}}
			>
				SignUp
			</div>
			<div
				className={`absolute bg-white w-[50%] h-[90%] rounded-full z-10 transition-all duration-200 ${
					auth === "login"
						? " left-1  translate-x-0"
						: " right-1/2 -left-1 translate-x-full "
				} `}
			></div>
		</div>
	);
};

export default ToogleBar;
