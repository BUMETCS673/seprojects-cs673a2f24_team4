import { configureStore } from '@reduxjs/toolkit';
import counterSlice from 'src/redux/slices/counterSlice';
import getmeSlice from 'src/redux/slices/meSlice';
import jobSlice from 'src/redux/slices/jobSlice';
import uploadSlice from 'src/redux/slices/uploadSlice';
import resumeSlice from 'src/redux/slices/resumeSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    me: getmeSlice,
    job: jobSlice,
    upload: uploadSlice,
    resume: resumeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
