"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../operations";
import { useAppDispatch, useAppSelector } from "@/store";
import { Follower, User } from "types";
import Image from "next/image";
import Link from "next/link";
import { updateChat } from "@/store/features";

export const ContactsList: React.FC = () => {
	const user = useAppSelector((state) => state.user) as User;
	const [followers, setFollowers] = useState<User[]>([]);
	const dispatch = useAppDispatch();
	useQuery(GET_FOLLOWERS, {
		variables: { id: user.id },
		onCompleted(data) {
			setFollowers(
				data?.followers.map((follow: Follower) =>
					follow.follower.id === user.id ? follow.following : follow.follower
				)
			);
		},
	});
	return (
		<ul
			className="bg-base-200 rounded-3xl overflow-hidden overflow-y-auto space-y-2 my-4 ml-4"
			style={{ height: "calc(100vh - 32px)" }}
		>
			{followers?.map((follow) => (
				<li
					key={follow.id}
					className=""
					onClick={() => dispatch(updateChat({ user: follow }))}
				>
					<Link
						href={`/messages/${follow.id}`}
						className="btn rounded-none btn-wide flex items-center justify-between h-auto py-2"
					>
						<Image
							width={50}
							height={50}
							src={follow.avatar}
							alt="Avatar"
							className={`rounded-full ring ring-offset-base-100 ring-offset-2 ${
								follow.isActive ? "ring-success" : "ring-error"
							}`}
						/>
						<bdi>{follow.username}</bdi>
					</Link>
				</li>
			))}
		</ul>
	);
};
