import { configureStore } from "@reduxjs/toolkit";
import {
	userSlice,
	imageSlice,
	profileSlice,
	themeSlice,
	postSlice,
	chatSlice,
} from "./features";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		image: imageSlice.reducer,
		profile: profileSlice.reducer,
		theme: themeSlice.reducer,
		chat: chatSlice.reducer,
		post: postSlice.reducer,
	},
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => appDispatch = useDispatch;
export default store;
