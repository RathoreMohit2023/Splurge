import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Remainder_Url } from '../NWConfig';

const url = `${BASE_URL}${Remainder_Url}`;

export const RemainderApi = createAsyncThunk(
  'RemainderApi',
  async ({formData, token}) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url, formData, {
        headers
      });
      // console.log("Response from RemainderApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      return error?.response?.data;
    }
  }
);