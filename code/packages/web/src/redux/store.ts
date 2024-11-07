import { configureStore } from '@reduxjs/toolkit';
import counterSlice from 'src/redux/slices/counterSlice';
import getmeSlice from 'src/redux/slices/meSlice';
import getJobSlice from 'src/redux/slices/jobSlice';
import uploadSlice from 'src/redux/slices/uploadSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    me: getmeSlice,
    job: getJobSlice,
    upload: uploadSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
