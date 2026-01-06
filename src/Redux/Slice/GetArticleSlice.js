import { createSlice } from '@reduxjs/toolkit';
import { GetArticleApi } from '../Api/GetArticleApi';

const GetArticleSlice = createSlice({
  name: 'GetArticle',
  initialState: {
    GetArticleloading: false,
    isError: false,
    GetArticleData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetArticleApi.pending, (state, action) => {
      state.GetArticleloading = true;
    });
    builder.addCase(GetArticleApi.fulfilled, (state, action) => {
      state.GetArticleloading = false;
      state.GetArticleData = action.payload;
    });
    builder.addCase(GetArticleApi.rejected, (state, action) => {
      state.GetArticleloading = false;
      state.isError = true;
    });
  },
});


export default GetArticleSlice.reducer;
