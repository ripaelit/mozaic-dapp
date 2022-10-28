import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  darkTheme: boolean;
}

const initialState: UserState = {
  darkTheme: true,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeToDark: (state) => {
      state.darkTheme = true;
    },
    changeToLight: (state) => {
      state.darkTheme = false;
    },
  },
});

export const { changeToDark, changeToLight } = themeSlice.actions;

export default themeSlice.reducer;
