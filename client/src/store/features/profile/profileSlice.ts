import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile } from 'types';

const initialState: Profile | {} = {};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<Profile>) => payload,
    editProfile: (state, { payload }: PayloadAction<Partial<Profile>>) => ({
      ...state,
      ...payload,
    }),
  },
});
export const { setProfile, editProfile } = profileSlice.actions;
