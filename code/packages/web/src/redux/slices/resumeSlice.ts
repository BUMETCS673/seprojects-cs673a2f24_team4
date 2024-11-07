import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { axiosClient } from 'src/services/api';

interface StorageRelation {
  id: String;
  name: String;
  mimetype: String;
  url: String;
  active: Boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  userId: String;
}

interface ResumeResponse {
  id: String;
  impactScore?: Number;
  presentationScore?: Number;
  competencyScore?: Number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  userId: String;
  storageId: String;
  storage: StorageRelation;
}

interface InitialState {
  loading: boolean;
  response: ResumeResponse[];
  error: string | undefined;
}

const initialState: InitialState = {
  loading: false,
  response: [],
  error: undefined,
};

const getResume = createAsyncThunk('resume/getResume', async (_, thunkAPI) => {
  const response = await axiosClient.get(`/resume`);
  return response.data;
});

const createResume = createAsyncThunk(
  'resume/createResume',
  async (ResumePostBody: { storageId: String }, thunkAPI) => {
    const createResumeResponse = await axiosClient.post('/resume', ResumePostBody);
    return createResumeResponse;
  },
);

const deleteResume = createAsyncThunk(
  'resume/deleteResume',
  async (resumeId: String, thunkAPI) => {
    await axiosClient.delete(`/resume?resumeId=${resumeId}`);
    return { resumeId };
  },
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getResume.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getResume.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(getResume.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = [];
      state.error = action.payload.error.message;
    });

    builder.addCase(createResume.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createResume.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response.push(action.payload);
    });
    builder.addCase(createResume.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });

    builder.addCase(deleteResume.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteResume.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = state.response.filter(
        (obj) => obj.id != action.payload.resumeId,
      );
    });
    builder.addCase(deleteResume.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
  },
  reducers: {},
});

export const resumeSelector = (state: RootState) => state.resume;
export default resumeSlice.reducer;
