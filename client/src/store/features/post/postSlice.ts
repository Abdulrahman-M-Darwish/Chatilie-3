import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "types";

const initialState: Post[] = [];

export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		addPost: (state, action: PayloadAction<Post>) => [...state, action.payload],
	},
});

export const { addPost } = postSlice.actions;
