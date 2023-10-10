"use client";
import React, { useRef, useState } from "react";
import { useAutoSizeTextArea, useBase64 } from "@/hooks";
import { useAppSelector } from "@/store";
import { Button, Dropdown, Textarea } from "react-daisyui";
import { Image as IImage, User } from "types";
import { IoEarthOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineLockOpen, MdOutlineThumbUpOffAlt } from "react-icons/md";
import { GiCrossedSwords } from "react-icons/gi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { AiOutlineShareAlt } from "react-icons/ai";
import moment from "moment";
import { ImAttachment } from "react-icons/im";
import { EmojiPicker } from "../EmojiPicker/EmojiPicker";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { CREATE_POST, UPLOAD_IMAGES } from "./operations";

type Props = {};

export const PostCreator: React.FC = (props: Props) => {
	const [postContent, setPostContent] = useState("");
	const [privacy, setPrivacy] = useState("PUBLIC");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	useAutoSizeTextArea(textAreaRef.current, postContent);
	const [file, setFile] = useState<File | null>(null);
	const user = useAppSelector(({ user }) => user) as User;
	const [imagesSrc, setImagesSrc] = useState<string[]>([]);
	const [caretPosition, setCaretPosition] = useState(0);
	useBase64(file, (base64Image) => setImagesSrc((p) => [...p, base64Image]));
	const [createPost] = useMutation(CREATE_POST);
	const [uploadImages] = useMutation(UPLOAD_IMAGES);
	const handlePrivacyChange = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => setPrivacy(e.currentTarget.dataset.value as string);
	const handleUploadPost = async () => {
		let pics: IImage[] = [];
		if (imagesSrc.length) {
			const { data } = await uploadImages({
				variables: {
					uploadImagesInput: { base64EncodedImages: imagesSrc, type: "posts" },
				},
			});
			pics = data?.uploadImages;
		}
		createPost({
			variables: {
				createPostInput: {
					text: postContent,
					imagesSrc: (pics || []).map((image: IImage) => image.secure_url),
				},
			},
		});
		setPostContent("");
		setImagesSrc([]);
	};
	const detailsRef = useRef<HTMLDetailsElement>(null);
	return (
		<div className="Post self-center w-full bg-base-200 pt-4 rounded-box">
			<div className="Header flex justify-between px-4">
				<div className="User">
					<div className="flex gap-2">
						<button className="w-14 h-14 btn btn-circle overflow-hidden bg-base-100">
							<Image width={56} height={56} src={user.avatar} alt="avatar" />
						</button>
						<div>
							<h2>{user.username}</h2>
							<h3 className="text-xs text-base-content/50 tracking-tighter -mt-1 flex items-center">
								@{user.name}
								<span className="w-1 h-1 inline-block mx-1 rounded-full bg-base-content/50" />
								{privacy == "PUBLIC" ? (
									<IoEarthOutline />
								) : privacy == "FRIENDS" ? (
									<FaUserFriends />
								) : (
									<MdOutlineLockOpen />
								)}
								<span className="w-1 h-1 inline-block mx-1 rounded-full bg-base-content/50" />
								{moment(new Date()).fromNow(true)}
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
					<div>
						<Textarea
							ref={textAreaRef}
							value={postContent}
							onChange={(e) => setPostContent(e.target.value)}
							onSelect={(e) => {
								setCaretPosition(e.currentTarget.selectionEnd);
							}}
							color="ghost"
							placeholder="Definitely Not Text"
							className="resize-none caret-primary-focus w-full focus:bg-opacity-5 focus:border-0 focus:outline-none border-none text-base px-8 py-2 font-mono bg-base-200"
						/>
					</div>
					{imagesSrc?.length ? (
						<div className="images flex flex-wrap rounded-box overflow-hidden border-2 border-base-content select-none">
							{imagesSrc?.length === 1 && (
								<Image
									alt="post poster"
									width={579}
									height={579}
									src={imagesSrc[0]}
								/>
							)}
							{imagesSrc?.length === 2 && (
								<>
									<Image
										alt="post poster"
										width={579}
										height={579}
										className="w-1/2 border-base-content border-r-2"
										src={imagesSrc[0]}
									/>
									<Image
										alt="post poster"
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
										alt="post poster"
										width={579}
										height={579}
										className="w-[70%] border-base-content border-r-2"
										src={imagesSrc[0]}
									/>
									<div className="w-[30%]">
										<Image
											alt="post poster"
											width={579}
											height={579}
											className="h-1/2 border-b-base-content border-b-2"
											src={imagesSrc[1]}
										/>
										<Image
											alt="post poster"
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
										alt="post poster"
										width={579}
										height={579}
										className="w-1/2 border-r-base-content border-b-base-content border-r-2 border-b-2"
										src={imagesSrc[0]}
									/>
									<Image
										alt="post poster"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[1]}
									/>
									<Image
										alt="post poster"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[2]}
									/>
									<Image
										alt="post poster"
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
										alt="post poster"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[0]}
									/>
									<Image
										alt="post poster"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[1]}
									/>
									<Image
										alt="post poster"
										width={579}
										height={579}
										className="w-1/2"
										src={imagesSrc[2]}
									/>
									<Image
										alt="post poster"
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
							?
							<MdOutlineThumbUpOffAlt className="text-xl" />
						</div>
						<div className="flex gap-2">
							<div className="flex text-warning bg-warning-content py-1 px-2 rounded shadow font-bold gap-1 items-center">
								<HiOutlineChatBubbleLeftRight className="text-xl" />?
							</div>
							<div className="flex text-accent-focus bg-accent-content py-1 px-2 rounded shadow font-bold gap-1 items-center">
								<AiOutlineShareAlt className="text-xl" />?
							</div>
						</div>
					</div>
					<div className="flex gap-1">
						<label htmlFor="postPic" className="cursor-pointer btn">
							<input
								type="file"
								className="hidden"
								id="postPic"
								accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
								onChange={(e) =>
									setFile(e.target.files ? e.target.files[0] : null)
								}
							/>
							<ImAttachment />
						</label>
						<Button
							color="primary"
							className="flex-1"
							onClick={handleUploadPost}
						>
							Done
						</Button>
						<Dropdown.Details ref={detailsRef}>
							<Dropdown.Details.Toggle className="font-mono">
								{">_<"}
							</Dropdown.Details.Toggle>
							<EmojiPicker
								onEmojiSelect={({ native }) => {
									setPostContent(
										(p) =>
											p.slice(0, caretPosition) +
											native +
											p.slice(caretPosition)
									);
									setCaretPosition((p) => (p += native.length));
								}}
							/>
						</Dropdown.Details>
						<Dropdown.Details>
							<Dropdown.Details.Toggle className="text-xl">
								{privacy == "PUBLIC" ? (
									<IoEarthOutline />
								) : privacy == "FRIENDS" ? (
									<FaUserFriends />
								) : (
									<MdOutlineLockOpen />
								)}
							</Dropdown.Details.Toggle>
							<Dropdown.Menu className="z-50 relative">
								<Dropdown.Item
									data-value="PUBLIC"
									onClick={handlePrivacyChange}
								>
									Public <IoEarthOutline />
								</Dropdown.Item>
								<Dropdown.Item
									data-value="FRIENDS"
									onClick={handlePrivacyChange}
								>
									OnlyFriends <FaUserFriends />
								</Dropdown.Item>
								<Dropdown.Item
									data-value="PRIVATE"
									onClick={handlePrivacyChange}
								>
									Private <MdOutlineLockOpen />
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown.Details>
					</div>
				</div>
			</div>
		</div>
	);
};
