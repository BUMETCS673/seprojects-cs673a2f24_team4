import { configureStore } from '@reduxjs/toolkit';
import counterSlice from 'src/redux/slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
