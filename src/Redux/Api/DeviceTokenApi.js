import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, DeviceToken_Url } from '../NWConfig';

const url = `${BASE_URL}${DeviceToken_Url}`;

export const DeviceTokenApi = createAsyncThunk(
  'DeviceTokenApi',
  async ({postData, token}) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    
    try {
      const response = await axios.post(url, postData, {
        headers
      });
      // console.log("Response from DeviceTokenApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      return error?.response?.data;
    }
  }
);