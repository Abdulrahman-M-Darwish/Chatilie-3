import React from "react";
import { ContactsList } from "./components";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="flex flex-1">
			<ContactsList />
			{children}
		</div>
	);
};

export default Layout;
