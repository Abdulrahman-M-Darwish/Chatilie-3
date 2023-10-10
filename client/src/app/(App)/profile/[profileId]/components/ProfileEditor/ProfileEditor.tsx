import React, { useCallback, useRef, useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Dropdown, Input, Modal, Textarea } from "react-daisyui";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Profile, User } from "types";
import { Avatar, Cover, CoverCropper } from "./components";
import { useAppDispatch, useAppSelector } from "@/store";
import { BsArrowLeft } from "react-icons/bs";
import {
	closeImage,
	editProfile,
	editUser,
	reset,
	setImage,
} from "@/store/features";
import { useFormik } from "formik";
import { useAutoSizeTextArea, useClickOutside } from "@/hooks";
import { useMutation } from "@apollo/client";
import { EmojiPicker } from "@/components";
import { UPLOAD_COVER, UPDATE_PROFILE, UPDATE_USER } from "./operations";

export const ProfileEditor: React.FC = () => {
	const user = useAppSelector((state) => state.user) as User;
	const profile = useAppSelector((state) => state.profile) as Profile;
	const { avatar, cover, isModalOpen, type } = useAppSelector(
		(state) => state.image
	);
	const [emoji, setEmoji] = useState({ name: "", native: "" });
	const [hobbyName, setHobbyName] = useState("");
	const [uploadImage] = useMutation(UPLOAD_COVER);
	const [updateProfile] = useMutation(UPDATE_PROFILE);
	const [updateUser] = useMutation(UPDATE_USER);
	const [hobbies, setHobbies] = useState<string[]>(profile.hobbies as string[]);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const addHobbyRef = useRef<HTMLDialogElement>(null);
	const emojiDropdownRef = useRef<HTMLDetailsElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const dispatch = useAppDispatch();
	const formik = useFormik({
		initialValues: {
			username: user.username,
			livesIn: profile.livesIn,
			bio: profile.bio || "",
		},
		onSubmit(values, formikHelpers) {},
	});
	const setHobby = () => {
		if (!hobbyName || !emoji) {
			return;
		}
		setHobbies((p) => [...p, `${emoji.native} ${hobbyName}`]);
		setEmoji({ name: "", native: "" });
		setHobbyName("");
	};
	const handleSave = async () => {
		dialogRef.current?.close();
		const { bio, livesIn, username } = formik.values;
		if (
			!avatar &&
			!cover &&
			bio === profile.bio &&
			livesIn === profile.livesIn &&
			username === user.username &&
			hobbies.toString() === profile.hobbies.toString()
		)
			return;
		let uploadedCover = "";
		let uploadedAvatar = "";
		dispatch(
			editUser({
				avatar: avatar || user.avatar,
				username: username || user.username,
			})
		);
		dispatch(editProfile({ cover: cover || profile.cover }));
		if (cover) {
			const { data } = await uploadImage({
				variables: {
					uploadImageInput: { base64EncodedImage: cover, type: "cover" },
				},
			});
			uploadedCover = data.uploadImage.secure_url;
			dispatch(setImage({ image: "", type: "cover" }));
		}
		if (avatar) {
			const { data } = await uploadImage({
				variables: {
					uploadImageInput: { base64EncodedImage: avatar, type: "avatar" },
				},
			});
			uploadedAvatar = data.uploadImage.secure_url;
			dispatch(setImage({ image: "", type: "avatar" }));
		}
		if (username) {
			updateUser({
				variables: {
					updateUserInput: { username, avatar: uploadedAvatar || user.avatar },
				},
			});
		}
		dispatch(editProfile({ bio, livesIn, hobbies }));
		updateProfile({
			variables: {
				updateProfileId: user.id,
				updateProfileInput: {
					bio,
					livesIn,
					hobbies,
					cover: uploadedCover || profile.cover,
				},
			},
		});
		dispatch(reset());
	};
	const handleClose = () => {
		dispatch(setImage({ image: "", type }));
		dispatch(closeImage());
	};
	useAutoSizeTextArea(textAreaRef.current, formik.values.bio);
	useClickOutside(addHobbyRef.current);
	useClickOutside(emojiDropdownRef.current);
	return (
		<>
			<Button
				className="self-end ml-auto capitalize"
				onClick={() => dialogRef.current?.showModal()}
			>
				<TbUserEdit className="text-2xl" /> Edit
			</Button>
			<Modal ref={dialogRef} className="p-0">
				<Modal.Actions className="bg-base-200 flex justify-between items-center p-4 gap-2 sticky top-0 m-0">
					{isModalOpen && (
						<button type="button" onClick={handleClose}>
							<BsArrowLeft className="text-2xl" />
						</button>
					)}
					{!isModalOpen && (
						<button onClick={() => dialogRef.current?.close()}>
							<AiOutlineClose className="text-2xl" />
						</button>
					)}
					<h2 className="!mr-auto text-xl">Edit Profile</h2>
					{!isModalOpen && (
						<button
							className="btn btn-primary px-8 capitalize font-bold rounded-full"
							onClick={handleSave}
						>
							save
						</button>
					)}
				</Modal.Actions>
				<Modal.Body className="bg-base-300">
					{isModalOpen && (avatar || cover) && <CoverCropper />}
					{!isModalOpen && (
						<>
							<Cover />
							<Avatar />
							<div className="px-8 space-y-6">
								<div className="relative">
									<label
										htmlFor="username"
										className="absolute left-0 top-0 text-primary font-bold translate-x-4 -translate-y-1/2 bg-base-300 px-2"
									>
										Username
									</label>
									<Input
										id="username"
										placeholder="username"
										size="lg"
										color="ghost"
										className="focus:bg-opacity-5 w-full"
										{...formik.getFieldProps("username")}
									/>
								</div>
								<div className="relative">
									<label
										htmlFor="livesIn"
										className="absolute left-0 top-0 text-primary font-bold translate-x-4 -translate-y-1/2 bg-base-300 px-2"
									>
										Lives In
									</label>
									<Input
										id="livesIn"
										placeholder="Lives In Eg. Egypt"
										size="lg"
										color="ghost"
										className="focus:bg-opacity-5 w-full"
										{...formik.getFieldProps("livesIn")}
									/>
								</div>
								<div className="relative">
									<label
										htmlFor="bio"
										className="absolute left-0 top-0 text-primary font-bold translate-x-4 -translate-y-1/2 bg-base-300 px-2"
									>
										Bio
									</label>
									<Textarea
										id="bio"
										color="ghost"
										size="lg"
										placeholder="NO BIO >_<"
										className="focus:bg-opacity-5 w-full resize-none"
										ref={textAreaRef}
										{...formik.getFieldProps("bio")}
									></Textarea>
								</div>
								<div className="relative pb-2">
									<div className="flex justify-between items-center">
										<h3 className="text-2xl">Hobbies</h3>
										<Dropdown.Details
											vertical="top"
											horizontal="left"
											ref={addHobbyRef}
										>
											<Dropdown.Details.Toggle className="bg-opacity-5">
												<IoMdAddCircleOutline className="text-3xl cursor-pointer" />
											</Dropdown.Details.Toggle>
											<Dropdown.Menu className="space-y-2 translate-x-[45%]">
												<label htmlFor="hobbyName" className="ml-2">
													Hobby Name
												</label>
												<Input
													id="hobbyName"
													placeholder="Name"
													size="sm"
													color="ghost"
													className="focus:bg-opacity-5"
													value={hobbyName}
													onChange={(e) => setHobbyName(e.target.value)}
												/>
												<div className="flex gap-2 items-center">
													<Dropdown.Details
														vertical="top"
														horizontal="left"
														ref={emojiDropdownRef}
													>
														<Dropdown.Details.Toggle className="w-12 h-12 text-2xl rounded-full">
															<span>{emoji.native}</span>
														</Dropdown.Details.Toggle>
														<EmojiPicker
															onEmojiSelect={({ name, native }) => {
																setEmoji({ name, native });
															}}
														/>
													</Dropdown.Details>
													<h4 className="text-warning">
														{emoji.name || "Emoji"}
													</h4>
												</div>
												<Button
													className="capitalize"
													type="button"
													onClick={setHobby}
												>
													Done
												</Button>
											</Dropdown.Menu>
										</Dropdown.Details>
									</div>
									<ul className="flex flex-wrap gap-2">
										{hobbies.map((hobby, i) => (
											<li
												key={i}
												className="btn btn-sm rounded-full capitalize even:bg-warning-content even:text-warning odd:bg-primary-content odd:text-primary-focus"
											>
												{hobby}
											</li>
										))}
									</ul>
								</div>
							</div>
						</>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
};
