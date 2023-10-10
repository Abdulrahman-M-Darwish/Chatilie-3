import React from "react";
import { Heart } from "@/components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiCrossedSwords } from "react-icons/gi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { AiOutlineShareAlt } from "react-icons/ai";
import { IoEarthOutline } from "react-icons/io5";
import { MdOutlineLockOpen, MdOutlineThumbUpOffAlt } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { Post as IPost } from "types";
import moment from "moment";
import Image from "next/image";

export const Post: React.FC<IPost> = ({
	author,
	comments,
	createdAt,
	likes,
	privacy,
	shares,
	imagesSrc,
	text,
}) => {
	return (
		<div className="Post self-center w-full bg-base-200 pt-4 rounded-box">
			<div className="Header flex justify-between px-4">
				<div className="User">
					<div className="flex gap-2">
						<button className="w-14 h-14 btn btn-circle overflow-hidden bg-base-100">
							<Image width={56} height={56} src={author.avatar} alt="avatar" />
						</button>
						<div>
							<h2>{author.username}</h2>
							<h3 className="text-xs text-base-content/50 tracking-tighter -mt-1 flex items-center">
								@{author.name}
								<span className="w-1 h-1 inline-block mx-1 rounded-full bg-base-content/50" />
								{privacy == "PUBLIC" ? (
									<IoEarthOutline />
								) : privacy == "FRIENDS" ? (
									<FaUserFriends />
								) : (
									<MdOutlineLockOpen />
								)}
								<span className="w-1 h-1 inline-block mx-1 rounded-full bg-base-content/50" />
								{moment(new Date(createdAt)).fromNow(true)}
							</h3>
						</div>
					</div>
				</div>
				<div className="Controls space-x-4">
					<button className="text-2xl btn btn-circle btn-outline btn-primary hover:text-primary hover:border-primary hover:border-2 hover:bg-primary-content hover:ring hover:ring-primary hover:ring-offset-8 hover:ring-offset-primary-content hover:animate-spin duration-700">
						<GiCrossedSwords />
					</button>
					<button className="text-2xl btn btn-circle btn-outline btn-primary hover:text-primary hover:border-primary hover:border-2 hover:bg-primary-content hover:ring hover:ring-primary hover:ring-offset-8 hover:ring-offset-primary-content hover:animate-spin duration-700">
						<BsThreeDotsVertical />
					</button>
				</div>
			</div>
			<div className="Body">
				<figure>
					<pre className="px-8 py-2 whitespace-pre-wrap break-words">
						{text}
					</pre>
					{imagesSrc?.length ? (
						<div className="images flex flex-wrap rounded-box overflow-hidden border-2 border-base-content">
							{imagesSrc?.length === 1 && (
								<Image
									alt="Idk Maybe It's An Image Of Hell"
									width={579}
									height={579}
									className="w-full"
									src={imagesSrc[0]}
								/>
							)}
							{imagesSrc?.length === 2 && (
								<>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-1/2 border-base-content border-r-2"
										src={imagesSrc[0]}
									/>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[1]}
									/>
								</>
							)}
							{imagesSrc?.length === 3 && (
								<>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-[70%] border-base-content border-r-2"
										src={imagesSrc[0]}
									/>
									<div className="w-[30%]">
										<Image
											alt="Idk Maybe It's An Image Of Hell"
											width={579}
											height={579}
											className="h-1/2 border-b-base-content border-b-2"
											src={imagesSrc[1]}
										/>
										<Image
											alt="Idk Maybe It's An Image Of Hell"
											width={579}
											height={579}
											className="h-1/2"
											src={imagesSrc[2]}
										/>
									</div>
								</>
							)}
							{imagesSrc?.length === 4 && (
								<>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-1/2 border-r-base-content border-b-base-content border-r-2 border-b-2"
										src={imagesSrc[0]}
									/>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[1]}
									/>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[2]}
									/>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-1/2 border-base-content border-l-2 border-t-2"
										src={imagesSrc[3]}
									/>
								</>
							)}
							{imagesSrc?.length > 4 && (
								<>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[0]}
									/>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[1]}
									/>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[2]}
									/>
									<Image
										alt="Idk Maybe It's An Image Of Hell"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[3]}
									/>
								</>
							)}
						</div>
					) : null}
				</figure>
				<div className="Reacts flex flex-col w-full">
					<div className="p-2 flex justify-between gap-2">
						<div className="flex text-primary-focus font-bold gap-1 bg-primary-content py-1 px-2 rounded shadow w-fit">
							{likes}
							<MdOutlineThumbUpOffAlt className="text-xl" />
						</div>
						<div className="flex gap-2">
							<div className="flex text-warning bg-warning-content py-1 px-2 rounded shadow font-bold gap-1 items-center">
								<HiOutlineChatBubbleLeftRight className="text-xl" />
								{comments}
							</div>
							<div className="flex text-accent-focus bg-accent-content py-1 px-2 rounded shadow font-bold gap-1 items-center">
								<AiOutlineShareAlt className="text-xl" />
								{shares}
							</div>
						</div>
					</div>
					<div className="join flex-1">
						<Heart />
						<button className="btn join-item flex-1 btn-ghost text-lg capitalize hover:bg-warning-content hover:text-warning">
							<HiOutlineChatBubbleLeftRight className="text-2xl" />
							Comment
						</button>
						<button className="btn join-item flex-1 btn-ghost text-lg capitalize rounded-tr-none rounded-br-box hover:bg-accent-content hover:text-accent">
							<AiOutlineShareAlt className="text-2xl -rotate-180" />
							Share
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
