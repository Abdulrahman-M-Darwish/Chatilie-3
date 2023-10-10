"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setProfile, setUser } from "@/store/features";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

const GET_USER = gql`
	query GetUser($userId: ID!) {
		user(id: $userId) {
			id
			name
			email
			isActive
			avatar
			birthDate
			username
			profile {
				id
				cover
				country
				bio
				gender
				livesIn
				education
				worksAt
				relationship
				certificates
				hobbies
				likes
				friends
				reputation
			}
		}
	}
`;

export const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const dispatch = useAppDispatch();
	const { replace } = useRouter();
	const { data, loading, error } = useQuery(GET_USER, {
		variables: { userId: "me" },
	});
	useEffect(() => {
		if (data) {
			dispatch(setUser(data.user));
			dispatch(setProfile(data.user.profile));
		}
		if (error?.message == "Forbidden resource") {
			replace("/login");
		}
	}, [data, dispatch, error, loading, replace]);
	if (error?.message == "Failed to fetch")
		return "failed to fetch please check your internet connection";
	if (loading) return "loading";
	if (data) return children;
};
