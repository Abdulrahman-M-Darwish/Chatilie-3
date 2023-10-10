import React from "react";
import { Navbar, ProtectedRoutes } from "@/components";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ProtectedRoutes>
			<div className="flex">
				<Navbar />
				{children}
			</div>
		</ProtectedRoutes>
	);
};

export default Layout;
