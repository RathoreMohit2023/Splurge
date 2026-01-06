import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetInterest_Url } from '../NWConfig';

const url = `${BASE_URL}${GetInterest_Url}`;

export const GetInterestApi = createAsyncThunk(
  'GetInterest',
  async () => {
    
    const headers = {
        "Content-Type": "application/json",
    }
    try {
      const response = await axios.get(url, {
        headers,
      });
      // console.log("GetInterestApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("GetInterestApi error:", error.response);
      return error?.response?.data;
    }
  }
);