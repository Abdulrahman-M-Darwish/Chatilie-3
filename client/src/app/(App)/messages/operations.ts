import { gql } from "@apollo/client";

export const GET_FOLLOWERS = gql`
	query GetFollowers($id: ID!) {
		followers(id: $id) {
			id
			followerId
			followingId
			follower {
				id
				name
				email
				isActive
				avatar
				birthDate
				username
			}
			following {
				id
				name
				email
				isActive
				avatar
				birthDate
				username
			}
		}
	}
`;

export const GET_FOLLOWER_MESSAGES = gql`
	query GetFollowerMessages($followerId: ID!) {
		follower(followerId: $followerId) {
			id
			followerId
			followingId
			createdAt
			messages {
				id
				text
				mediasUrl
				author {
					id
					name
					email
					isActive
					avatar
					birthDate
					username
				}
				authorId
				createdAt
				updatedAt
				followsFollowerId
				followsFollowingId
			}
		}
	}
`;

export const SEND_MESSAGE = gql`
	mutation CreateMessage($createMessageInput: CreateMessageInput!) {
		createMessage(createMessageInput: $createMessageInput) {
			id
			text
			mediasUrl
			authorId
			createdAt
			updatedAt
			followsFollowerId
			followsFollowingId
			author {
				id
				name
				email
				isActive
				avatar
				birthDate
				username
			}
		}
	}
`;

export const ON_MESSAGE_CREATED = gql`
	subscription MessageCreated {
		messageCreated {
			id
			text
			mediasUrl
			authorId
			createdAt
			updatedAt
			followsFollowerId
			followsFollowingId
			author {
				id
				name
				email
				isActive
				avatar
				birthDate
				username
			}
		}
	}
`;

export const GET_USER = gql`
	query User($userId: ID!) {
		user(id: $userId) {
			id
			name
			avatar
			username
		}
	}
`;
