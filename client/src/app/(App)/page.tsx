"use client";
import { NoPosts, Post, PostCreator } from "@/components";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { Post as IPost } from "types";

const GET_POSTS = gql`
	query GetPosts {
		posts {
			id
			comments
			createdAt
			likes
			privacy
			imagesSrc
			text
			author {
				avatar
				username
				name
			}
		}
	}
`;

const Home: React.FC = () => {
	const { data } = useQuery(GET_POSTS);
	return (
		<div className="flex gap-8 mx-8 flex-1 py-5">
			<div className="max-w-xl w-full mx-auto flex flex-col gap-4">
				<PostCreator />
				{!data?.posts?.length && <NoPosts />}
				<ul className="Posts flex flex-col gap-4">
					{data?.posts?.map((post: IPost) => (
						<Post {...post} key={post.id} />
					))}
				</ul>
			</div>
			{/* <SideNav /> */}
		</div>
	);
};

export default Home;
