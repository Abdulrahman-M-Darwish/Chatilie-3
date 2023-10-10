"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Profile, User } from "types";
import { LiaCalendarSolid, LiaUserFriendsSolid } from "react-icons/lia";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { PiMaskSadBold } from "react-icons/pi";
import { gql, useLazyQuery } from "@apollo/client";
import { ProfileEditor } from "./components";
import { useAppSelector } from "@/store";
import { GET_USER } from "./operations";

const Layout: React.FC<{ children: React.ReactNode; params: any }> = ({
	children,
	params,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);
	const currentUser = useAppSelector((state) => ({
		user: state.user as User,
		profile: state.profile as Profile,
	}));
	const [getUser, { data, loading, error }] = useLazyQuery(GET_USER);
	const profileId = params.profileId.slice(3);
	const isMe = profileId === currentUser.user.name;
	useEffect(() => {
		if (isMe) {
			setUser(currentUser.user);
			setProfile(currentUser.profile);
		} else {
			getUser({
				variables: { userId: profileId },
			});
			setUser(data?.user);
			setProfile(data?.user.profile);
		}
	}, [
		currentUser.profile,
		currentUser.user,
		data?.user,
		getUser,
		isMe,
		profileId,
	]);
	const year = new Date(user?.birthDate).getFullYear();
	if (loading) return "loading...";
	if (error) return "user might not be found";
	if (user && profile)
		return (
			<div className="mx-28 flex-1">
				<div className="Cover w-full rounded-b-[3rem] overflow-hidden">
					{profile.cover ? (
						<Image
							src={profile.cover}
							alt="ok"
							width={1920}
							height={1080}
							className="aspect-[16/6]"
						/>
					) : (
						<div className="bg-neutral-focus aspect-[16/6] text-2xl flex items-center justify-center font-semibold">
							Empty Just Like You
						</div>
					)}
				</div>
				<div className="User pl-16 -translate-y-1/4 flex gap-4 items-center relative">
					<div className="avatar">
						<div className="w-32 h-32 ring-8 ring-base-100 rounded-full shadow-lg shadow-base-300 bg-base-100 relative z-50">
							<Image
								width={128}
								height={128}
								src={user.avatar}
								alt="avatar"
								className="object-contain"
							/>
						</div>
					</div>
					<div>
						<h1 className="text-2xl font-bold">{user.username}</h1>
						<h2 className="text-lg opacity-70 font-semibold tracking-tighter -mt-1">
							@{user.name}
						</h2>
						<div className="flex gap-2 absolute">
							<div className="px-4 py-2 bg-primary-content text-primary flex gap-2 items-center rounded-md shadow font-bold">
								<LiaCalendarSolid className="text-2xl" /> {year}
							</div>
							<div className="px-4 py-2 bg-success-content text-success flex gap-2 items-center rounded-md shadow font-bold">
								{profile?.friends ? (
									<>
										<LiaUserFriendsSolid className="text-2xl" />{" "}
										{profile?.friends}
									</>
								) : (
									<PiMaskSadBold className="text-2xl" />
								)}
							</div>
							<div className="px-4 py-2 bg-warning-content text-warning flex gap-2 items-center rounded-md shadow font-bold">
								{profile?.gender === "MALE" ? (
									<IoMdMale className="text-2xl" />
								) : (
									<IoMdFemale className="text-2xl" />
								)}
							</div>
						</div>
					</div>
					{isMe && <ProfileEditor />}
				</div>
				<div className="Tabs join w-full mt-4">
					<Link
						href={`profile/${profileId}`}
						className="btn btn-outline btn-primary join-item flex-1 capitalize"
					>
						Posts
					</Link>
					<Link
						href={`profile/${profileId}/likes`}
						className="btn btn-outline btn-secondary join-item flex-1 capitalize"
					>
						Likes
					</Link>
					<Link
						href={`profile/${profileId}*/bookmarks`}
						className="btn btn-outline btn-primary join-item flex-1 capitalize"
					>
						Bookmarks
					</Link>
					<Link
						href={`profile/${profileId}/videos`}
						className="btn btn-outline btn-secondary join-item flex-1 capitalize"
					>
						Videos
					</Link>
				</div>
				{children}
			</div>
		);
};

export default Layout;
