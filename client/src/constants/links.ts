import { AiOutlineHome, AiOutlineBell } from "react-icons/ai";
import { BsBookmarkStar } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import { TbWall } from "react-icons/tb";
import { FaRegEnvelope } from "react-icons/fa";

export const links = [
	{
		name: "Home",
		path: "/",
		icon: AiOutlineHome,
	},
	{
		name: "Notifications",
		path: "/notifications",
		icon: AiOutlineBell,
	},
	{
		name: "Messages",
		path: "/messages",
		icon: FaRegEnvelope,
	},
	{
		name: "Bookmarks",
		path: "/bookmarks",
		icon: BsBookmarkStar,
	},
	{
		name: "Wall Of Fame",
		path: "/wall-of-fame",
		icon: TbWall,
	},
	{
		name: "Settings",
		path: "/settings",
		icon: BiCog,
	},
];
