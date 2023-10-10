import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "types";

const initialState: User | {} = {};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<User>) => {
			const user = structuredClone(payload);
			delete user.profile;
			return user;
		},
		editUser: (state, { payload }: PayloadAction<Partial<User>>) => ({
			...state,
			...payload,
		}),
	},
});

export const { setUser, editUser } = userSlice.actions;
