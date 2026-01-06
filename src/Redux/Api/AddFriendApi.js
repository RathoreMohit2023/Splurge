import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, AddFriend_Url } from '../NWConfig';

const url = `${BASE_URL}${AddFriend_Url}`;

export const AddFriendApi = createAsyncThunk(
  'AddFriendApi',
  async ({formData, token}) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    // console.log("formData:", formData);
    // console.log("token:", token);
    
    try {
      const response = await axios.post(url, formData, {
        headers
      });
      // console.log("Response from AddFriendApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      return error?.response?.data;
    }
  }
);