import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, changePassowrd_url } from '../NWConfig';

const url = `${BASE_URL}${changePassowrd_url}`;

export const ChangePasswordApi = createAsyncThunk(
  'ChangePasswordApi',
  async ({postData, token}) => {
    
    const headers = {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url, postData, {
        headers
      });
      console.log("Response from ChangePasswordApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      return error?.response?.data;
    }
  }
);