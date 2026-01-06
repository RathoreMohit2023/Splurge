import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetUserDetails_Url } from '../NWConfig';

const url = `${BASE_URL}${GetUserDetails_Url}`;

export const GetUserDetailsApi = createAsyncThunk(
  'GetUserDetails',
  async (token) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url, {
        headers,
      });
      // console.log("GetUserDetailsApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("GetUserDetailsApi Api error:", error);
      return error?.response?.data;
    }
  }
);