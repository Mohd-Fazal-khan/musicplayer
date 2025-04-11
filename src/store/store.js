import { configureStore } from '@reduxjs/toolkit';
import gradientReducer from './gradientSlice';

export const store = configureStore({
  reducer: {
    gradient: gradientReducer,
  },
});
