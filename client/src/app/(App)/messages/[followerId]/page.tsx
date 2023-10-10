"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GiCrossedSwords } from "react-icons/gi";
import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";
import { ChatBubble } from "react-daisyui";
import { useQuery, useSubscription } from "@apollo/client";
import { ChatBoxInput } from "../components/ChatBox/ChatBoxInput";
import {
	GET_FOLLOWER_MESSAGES,
	GET_USER,
	ON_MESSAGE_CREATED,
} from "../operations";
import { Message } from "types";
import { updateCache } from "@/utils";

const ChatBox: React.FC<{ params: { followerId: string } }> = ({
	params: { followerId },
}) => {
	const spanRef = useRef<HTMLLIElement>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const { data } = useQuery(GET_USER, {
		variables: { userId: followerId },
	});
	const { data: follower, client } = useQuery(GET_FOLLOWER_MESSAGES, {
		variables: { followerId },
	});
	useSubscription(ON_MESSAGE_CREATED, {
		onData: ({ data: { data } }) => {
			setMessages((p) => [...p, data.messageCreated]);
			updateCache({
				query: GET_FOLLOWER_MESSAGES,
				variables: { followerId },
				data: (queryData) => ({
					...queryData.follower,
					messages: [...queryData.follower.messages, data.messageCreated],
				}),
			});
		},
	});
	useEffect(() => {
		if (follower) {
			setMessages(follower.follower.messages);
		}
	}, [follower]);
	useEffect(() => {
		spanRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, data]);
	if (data)
		return (
			<div
				className="flex flex-1 flex-col bg-base-200 m-4 rounded-3xl divide-y-2 divide-base-100"
				style={{ height: "calc(100vh - 32px)" }}
			>
				<div className="nav flex items-center justify-between p-4">
					<div className="Controls space-x-4">
						<button className="text-2xl btn btn-circle btn-outline btn-primary hover:text-primary hover:border-primary hover:border-2 hover:bg-primary-content hover:ring hover:ring-primary hover:ring-offset-8 hover:ring-offset-primary-content hover:animate-spin duration-700">
							<GiCrossedSwords />
						</button>
						<button className="text-2xl btn btn-circle btn-outline btn-primary hover:text-primary hover:border-primary hover:border-2 hover:bg-primary-content hover:ring hover:ring-primary hover:ring-offset-8 hover:ring-offset-primary-content hover:animate-spin duration-700">
							<BsThreeDotsVertical />
						</button>
					</div>
					<h2 className="text-xl bg-base-content text-base-100 p-2 rounded-lg">
						{data.user.name}
					</h2>
					<div className="flex gap-3 items-center">
						<bdi>{data.user.username}</bdi>
						<Image
							width={50}
							height={50}
							src={data.user.avatar}
							alt="Avatar"
							className="rounded-full bg-base-300 ring ring-primary ring-offset-4 ring-offset-base-300"
						/>
					</div>
				</div>
				<div className="chat-box flex-1 overflow-hidden">
					<ul className="messages py-8 px-4 overflow-auto max-h-full">
						{messages.map((message: Message) => (
							<li key={message.id}>
								<ChatBubble end={message.author.id === data.user.id}>
									<ChatBubble.Header
										className={`flex gap-2 items-baseline mb-1 ${
											message.author.id === data.user.id
												? "flex-row-reverse me-2"
												: "ms-2"
										}`}
									>
										<bdi>{message.author.username}</bdi>
										<ChatBubble.Time>
											{moment(new Date(message.createdAt)).fromNow(true)}
										</ChatBubble.Time>
									</ChatBubble.Header>
									<ChatBubble.Avatar>
										<Image
											width={50}
											height={50}
											src={message.author.avatar}
											alt="Avatar"
											className="rounded-full !w-[50px]"
										/>
									</ChatBubble.Avatar>
									<ChatBubble.Message className="max-w-[50%] break-words">
										<bdi>{message.text}</bdi>
									</ChatBubble.Message>
								</ChatBubble>
							</li>
						))}
						<li ref={spanRef} />
					</ul>
				</div>
				<ChatBoxInput followerId={followerId} />
			</div>
		);
};

export default ChatBox;
