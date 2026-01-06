import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, SettleUp_Url } from '../NWConfig';

const url = `${BASE_URL}${SettleUp_Url}`;

export const SettleUpApi = createAsyncThunk(
  'SettleUpApi',
  async ({formData, token}) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url, formData, {
        headers
      });
      // console.log("Response from SettleUpApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      return error?.response?.data;
    }
  }
);