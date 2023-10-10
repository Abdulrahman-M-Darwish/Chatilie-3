import { useAutoSizeTextArea } from "@/hooks";
import { useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { Button, Textarea } from "react-daisyui";
import { BsMic } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { GET_FOLLOWER_MESSAGES, SEND_MESSAGE } from "../../operations";
import { useAppDispatch, useAppSelector } from "@/store";

export const ChatBoxInput: React.FC<{ followerId: string }> = ({
	followerId,
}) => {
	const [text, setText] = useState("");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	useAutoSizeTextArea(textAreaRef.current, text);
	const [sendMessage] = useMutation(SEND_MESSAGE, {
		// update: (cache, { data: { createMessage } }) => {
		// 	const { follower } = cache.readQuery({
		// 		query: GET_FOLLOWER_MESSAGES,
		// 		variables: {
		// 			followerId,
		// 		},
		// 	});
		// 	cache.writeQuery({
		// 		query: GET_FOLLOWER_MESSAGES,
		// 		data: {
		// 			follower: {
		// 				...follower,
		// 				messages: [...follower.messages, createMessage],
		// 			},
		// 		},
		// 		variables: { followerId },
		// 	});
		// },
	});
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if ((e.nativeEvent as any).inputType === "insertLineBreak") {
			e.target.form?.requestSubmit();
			return;
		}
		setText(e.target.value);
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!text) return;
		await sendMessage({
			variables: {
				createMessageInput: {
					text,
					followerId,
				},
			},
		});
		setText("");
	};
	return (
		<div className="chat-input">
			<form className="flex items-center gap-2 p-2" onSubmit={handleSubmit}>
				<Textarea
					className="flex-1 resize-none max-h-52"
					size="md"
					rows={1}
					placeholder="Talk So I Can C U"
					ref={textAreaRef}
					onChange={handleChange}
					value={text}
				/>
				{text ? (
					<Button>
						<FiSend className="text-2xl" />
					</Button>
				) : (
					<Button>
						<BsMic className="text-2xl" />
					</Button>
				)}
			</form>
		</div>
	);
};
