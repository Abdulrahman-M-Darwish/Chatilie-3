"use client";
import Lottie from "lottie-react";
import animationData from "@/animations/contact-chat.json";

export const Phone: React.FC = () => {
	return (
		<Lottie animationData={animationData} className="max-w-sm -scale-x-100" />
	);
};
