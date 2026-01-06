import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetCategories_Url } from '../NWConfig';

const url = `${BASE_URL}${GetCategories_Url}`;

export const GetCategoriesApi = createAsyncThunk(
  'GetCategoriesApi',
  async (token) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url, {
        headers,
      });
      // console.log("GetCategoriesApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("GetCategoriesApi Api error:", error);
      return error?.response?.data;
    }
  }
);