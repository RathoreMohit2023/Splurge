import { createSlice } from '@reduxjs/toolkit';
import { GetCategoriesApi } from '../Api/GetCategoriesApi';

const GetCategoriesSlice = createSlice({
  name: 'GetCategories',
  initialState: {
    GetCategoriesloading: false,
    isError: false,
    GetCategoriesData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetCategoriesApi.pending, (state, action) => {
      state.GetCategoriesloading = true;
    });
    builder.addCase(GetCategoriesApi.fulfilled, (state, action) => {
      state.GetCategoriesloading = false;
      state.GetCategoriesData = action.payload;
    });
    builder.addCase(GetCategoriesApi.rejected, (state, action) => {
      state.GetCategoriesloading = false;
      state.isError = true;
    });
  },
});


export default GetCategoriesSlice.reducer;
