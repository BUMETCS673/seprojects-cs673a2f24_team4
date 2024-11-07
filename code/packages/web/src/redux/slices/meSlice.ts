import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { axiosClient } from 'src/services/api';

interface UserBody {
  id: String;
  email: String;
  firstName: String;
  lastName: String;
  company?: String;
  phone?: String;
  group: 'recruiter' | 'user';
  username: String;
  providerId: String;
  providerName: String;
  active: Boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface DecodedBody {
  sub: String;
  email_verified: Boolean;
  name: String;
  preferred_username: String;
  given_name: String;
  family_name: String;
  email: String;
  group: Array<'recruiter' | 'user'>;
}

interface MeResponse {
  user: UserBody;
  decoded: DecodedBody;
}

interface InitialState {
  loading: boolean;
  response?: MeResponse;
  error: string | undefined;
}

const initialState: InitialState = {
  loading: false,
  response: undefined,
  error: undefined,
};
export const getMe = createAsyncThunk('getme/getmeAsync', async (thunkAPI) => {
  const response = await axiosClient.post(`/me`, {});
  return response.data;
});

const getmeSlice = createSlice({
  name: 'getme',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = undefined;
      state.error = action.payload.error.message;
    });
  },
  reducers: {},
});
export const getmeSelector = (state: RootState) => state.me;
export default getmeSlice.reducer;
