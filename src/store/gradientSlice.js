import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
};

const gradientSlice = createSlice({
  name: 'gradient',
  initialState,
  reducers: {
    setGradient: (state, action) => {
      state.gradient = action.payload;
    },
  },
});

export const { setGradient } = gradientSlice.actions;
export default gradientSlice.reducer;
