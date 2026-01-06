import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetFriends_Url } from '../NWConfig';

const url = `${BASE_URL}${GetFriends_Url}`;

export const GetFriendsApi = createAsyncThunk(
  'GetFriends',
  async ({token, id}) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url + id, {
        headers,
      });
      // console.log("GetFriendsApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("GetFriendsApi Api error:", error);
      return error?.response?.data;
    }
  }
);