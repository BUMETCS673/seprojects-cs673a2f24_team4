import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { axiosClient } from '../../services/api';

interface JobResponse {
  id: String;
  title: String;
  description: String;
  active: Boolean;
  coreRequirements: String;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  userId: Date;
  Applications: any[];
}

interface InitialState {
  loading: boolean;
  response: JobResponse[];
  error: string | undefined;
}

const initialState: InitialState = {
  loading: false,
  response: [],
  error: undefined,
};

export const getJob = createAsyncThunk('job/getJobAsync', async (_, _thunkAPI) => {
  const response = await axiosClient.get(`/job`);
  return response.data;
});

export const getJobUser = createAsyncThunk(
  'job/getJobPublic',
  async (searchTerm: string | undefined | null, _thunkAPI) => {
    const response = await axiosClient.get(`/job/public?searchTerm=${searchTerm}`);
    return response.data;
  },
);

export const createJob = createAsyncThunk(
  'job/createJob',
  async (
    JobListingsPostBody: {
      title: string;
      description: string;
      coreRequirements: string;
    },
    _thunkAPI,
  ) => {
    const jobCreationResponse = await axiosClient.post('/job', JobListingsPostBody);
    return jobCreationResponse.data;
  },
);

export const updateJob = createAsyncThunk(
  'job/updateJob',
  async (
    JobListingsPutBody: {
      id: String;
      title?: String;
      description?: String;
      coreRequirements?: String;
    },
    _thunkAPI,
  ) => {
    const jobUpdationResponse = await axiosClient.put(
      `/job?jobListingId=${JobListingsPutBody.id}`,
      JobListingsPutBody,
    );
    return jobUpdationResponse.data;
  },
);

export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (_jobId: String, _thunkAPI) => {},
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getJob.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(getJob.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = [];
      state.error = action.payload.error.message;
    });

    builder.addCase(getJobUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getJobUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(getJobUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = [];
      state.error = action.payload.error.message;
    });

    builder.addCase(createJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createJob.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response.push(action.payload);
    });
    builder.addCase(createJob.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });

    builder.addCase(updateJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateJob.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      var objIndex = state.response.findIndex((obj) => obj.id == action.payload.id);
      state.response[objIndex] = action.payload;
    });
    builder.addCase(updateJob.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
  },
  reducers: {},
});

export const getJobSelector = (state: RootState) => state.job;
export default jobSlice.reducer;
