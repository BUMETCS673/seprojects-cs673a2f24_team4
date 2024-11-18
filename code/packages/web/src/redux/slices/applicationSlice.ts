import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { axiosClient } from 'src/services/api';

enum ApplicationStatus {
  APPLIED = 'APPLIED',
  CANCELLED = 'CANCELLED',
  INTERVIEWING = 'INTERVIEWING',
  REJECTED = 'REJECTED',
  OFFER = 'OFFER',
}

interface ApplicationResponse {
  id: String;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  applicantId: String;
  jobListingId: String;
  resumeId: String;
}

interface InitialState {
  loading: boolean;
  response: ApplicationResponse[];
  error: string | undefined;
}

const initialState: InitialState = {
  loading: false,
  response: [],
  error: undefined,
};

export const getApplications = createAsyncThunk(
  'applications/getApplications',
  async (_, thunkAPI) => {
    const response = await axiosClient.get(`/applications`);
    return response.data;
  },
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getApplications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getApplications.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.response = action.payload;
      },
    );
    builder.addCase(
      getApplications.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.response = [];
        state.error = action.payload.error.message;
      },
    );
  },
  reducers: {},
});
export const getJobSelector = (state: RootState) => state.job;
export default applicationSlice.reducer;
