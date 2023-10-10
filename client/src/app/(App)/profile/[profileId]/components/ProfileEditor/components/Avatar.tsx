import { BiSolidCamera } from "react-icons/bi";
import Image from "next/image";
import { useState } from "react";
import { useBase64 } from "@/hooks";
import { openImage } from "@/store/features";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store";
import { User } from "types";

export const Avatar: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const avatar = useAppSelector((state) => (state.user as User).avatar);
	const avatarPreview = useAppSelector((state) => state.image.avatar);
	const dispatch = useDispatch();
	useBase64(file, (image) => {
		dispatch(openImage({ image, type: "avatar" }));
	});
	return (
		<>
			<input
				type="file"
				className="hidden"
				id="avatar"
				accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
				onChange={(e) => setFile(e.target.files![0])}
			/>
			<label
				htmlFor="avatar"
				className="avatar -translate-y-1/2 ml-6 focus:scale-[0.98] active:scale-[0.98] transition-all relative group"
			>
				<div className="absolute !flex items-center justify-center w-full h-full bg-base-300/75 z-50 rounded-full opacity-0 group-hover:opacity-100 transition-all">
					<BiSolidCamera className="text-4xl" />
				</div>
				<div className="w-32 h-32 ring-8 ring-base-200 rounded-full bg-base-200 relative">
					<Image
						width={150}
						height={150}
						src={avatarPreview || avatar}
						alt="avatar"
						className="object-contain"
					/>
				</div>
			</label>
		</>
	);
};
