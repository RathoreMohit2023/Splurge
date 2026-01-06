import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetGroupMembers_Url } from '../NWConfig';

const url = `${BASE_URL}${GetGroupMembers_Url}`;

export const GetGroupMembersApi = createAsyncThunk(
  'GetGroupMembersApi',
  async (token) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url, {
        headers,
      });
      // console.log("GetGroupMembersApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("GetGroupMembersApi error:", error);
      return error?.response?.data;
    }
  }
);