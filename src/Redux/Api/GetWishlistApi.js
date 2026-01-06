import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetWishlist_Url } from '../NWConfig';

const url = `${BASE_URL}${GetWishlist_Url}`;

export const GetWishlistApi = createAsyncThunk(
  'GetWishlist',
  async ({token, id}) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url + id, {
        headers,
      });
      // console.log("GetWishlistApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("GetWishlist Api error:", error.response?.data);
      return error?.response?.data;
    }
  }
);