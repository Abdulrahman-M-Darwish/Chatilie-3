"use client";
import { useRef } from "react";
import { FaRegThumbsDown } from "react-icons/fa";
import { RiThumbUpFill } from "react-icons/ri";

export const Heart: React.FC = () => {
	return (
		<details
			className="dropdown dropdown-end dropdown-top flex-1 flex"
			onMouseOver={(e) => e.currentTarget.setAttribute("open", "")}
			onMouseLeave={(e) => e.currentTarget.removeAttribute("open")}
			onClick={(e) => e.preventDefault()}
		>
			<summary className="btn join-item flex-1 btn-ghost text-lg relative capitalize rounded-bl-box hover:bg-primary-content hover:text-primary-focus rounded-none">
				<FaRegThumbsDown className="-rotate-180 text-xl" />
				Like
			</summary>
			<ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
				<li>
					<a>Item 1</a>
				</li>
				<li>
					<a>Item 2</a>
				</li>
			</ul>
		</details>
	);
};
