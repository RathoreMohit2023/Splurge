import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, AddGroup_Url } from '../NWConfig';

const url = `${BASE_URL}${AddGroup_Url}`;

export const AddGroupApi = createAsyncThunk(
  'AddGroupApi',
  async ({formData, token}) => {
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url, formData, {
        headers
      });
      // console.log("Response from AddGroupApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
     return error?.response?.data
    }
  }
);