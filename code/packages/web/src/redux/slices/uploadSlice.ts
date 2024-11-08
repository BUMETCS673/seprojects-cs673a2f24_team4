import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosClient } from 'src/services/api';

export interface UploadedFile {
  status: string | null;
  error: any;
}

const initialState: UploadedFile = {
  status: null,
  error: null,
};

export const uploadFile = createAsyncThunk(
  'upload/uploadFile',
  async (importData: { fileData: Blob; fileName: string }, thunkAPI) => {
    const body = new FormData();
    body.append('file', importData.fileData, importData.fileName);
    const uploadResponse = await axiosClient.post(`/storage`, body);
    return uploadResponse.data;
  },
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(uploadFile.fulfilled, (state) => {
      state.status = 'done';
    });
    builder.addCase(uploadFile.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.error = action.payload.error.message;
    });
  },
  reducers: {},
});

export default uploadSlice.reducer;
