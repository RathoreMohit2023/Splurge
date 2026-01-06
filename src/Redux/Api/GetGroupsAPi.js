import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetGroups_Url } from '../NWConfig';

const url = `${BASE_URL}${GetGroups_Url}`;

export const GetGroupsApi = createAsyncThunk(
  'GetGroups',
  async (token) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url, {
        headers,
      });
      // console.log("GetGroupsApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("GetGroupsApi error:", error);
      return error?.response?.data;
    }
  }
);