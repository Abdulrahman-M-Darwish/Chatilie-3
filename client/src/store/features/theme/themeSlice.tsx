import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDark: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsDark: (state, { payload }: PayloadAction<boolean>) => {
      state.isDark = payload;
    },
  },
});

export const { setIsDark } = themeSlice.actions;
