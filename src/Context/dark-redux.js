import { createSlice } from "@reduxjs/toolkit";

const darkState = { isDark: false };

const DarkSlice = createSlice({
  name: "dark",
  initialState: darkState,
  reducers: {
    toggle: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const DarkAction = DarkSlice.actions;

export default DarkSlice.reducer;
