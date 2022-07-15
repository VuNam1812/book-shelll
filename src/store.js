import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './redux/slices/bookSlice';

export const store = configureStore({
  reducer: {
    bookReducer
  }
})
