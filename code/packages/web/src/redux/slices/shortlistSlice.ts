import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { axiosClient } from 'src/services/api';

interface ResumeBody {
  id: string;
  impactScore?: string;
  presentationScore?: string;
  competencyScore?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  userId: string;
  storageId: string;
}

interface ApplicationBody {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  applicantId: string;
  jobListingId: string;
  resumeId: string;
  resume: ResumeBody;
}

interface ShortlistResponse {
  id: string;
  recruiterId: string;
  applicationId: string;
  jobListingId: string;
  application: ApplicationBody;
}

interface InitialState {
  loading: boolean;
  response: ShortlistResponse[];
  error: string | undefined;
}

const initialState: InitialState = {
  loading: false,
  response: [],
  error: undefined,
};

export const getShortList = createAsyncThunk(
  'shortList/getshortList',
  async (jobListingId: string, thunkAPI) => {
    const response = await axiosClient.get(
      `/shortList?jobListingId=${jobListingId}`,
    );
    return response.data;
  },
);

export const postShortList = createAsyncThunk(
  'shortList/postshortList',
  async (
    shortListPostBody: { jobListingId: string; applicationId: string },
    thunkAPI,
  ) => {
    const response = await axiosClient.post(`/shortList`, shortListPostBody);
    return response.data;
  },
);

const shortListSlice = createSlice({
  name: 'shortList',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getShortList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getShortList.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(getShortList.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = [];
      state.error = action.payload.error.message;
    });

    builder.addCase(postShortList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postShortList.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response.push(action.payload);
    });
    builder.addCase(postShortList.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = [];
      state.error = action.payload.error.message;
    });
  },
  reducers: {},
});
export const getShortListSelector = (state: RootState) => state.shortList;
export default shortListSlice.reducer;
