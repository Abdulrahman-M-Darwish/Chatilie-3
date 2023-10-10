import { useAppDispatch, useAppSelector } from "@/store";
import { openImage, setImage } from "@/store/features";
import React from "react";
import { ImUpload } from "react-icons/im";
import { Profile } from "types";
import Image from "next/image";

type Props = {};

export const Cover: React.FC<Props> = ({}) => {
	const preview = useAppSelector((state) => state.image.cover);
	const profile = useAppSelector((state) => state.profile) as Profile;
	const dispatch = useAppDispatch();
	const read = (file: File) => {
		if (!file) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () =>
			dispatch(openImage({ image: reader.result as string, type: "cover" }));
	};
	return (
		<>
			<input
				type="file"
				className="hidden"
				id="cover"
				onChange={(e) => read(e.target.files![0])}
				accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
			/>
			<label htmlFor="cover" className="cursor-pointer shadow-2xl">
				{preview || profile.cover ? (
					<Image
						alt="cover"
						width={1920}
						height={1080}
						src={preview || profile.cover!}
						className="aspect-[16/6] active:scale-[0.98] focus:scale-[0.98] transition-all"
					/>
				) : (
					<div className="bg-base-100 aspect-[16/6] cursor-pointer flex items-center justify-center text-xl font-semibold gap-2 text-base-content/50 hover:bg-base-100/75 transition-all select-none focus:scale-[0.98] active:scale-[0.98]">
						Upload A Cover
						<ImUpload className="text-2xl text-secondary-focus" />
					</div>
				)}
			</label>
		</>
	);
};
