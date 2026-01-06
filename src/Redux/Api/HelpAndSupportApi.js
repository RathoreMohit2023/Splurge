import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, HelpAndSupport_Url } from '../NWConfig';

const url = `${BASE_URL}${HelpAndSupport_Url}`;

export const HelpAndSupportApi = createAsyncThunk(
  'HelpAndSupport',
  async (token) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url, {
        headers,                
      });
      // console.log("HelpAndSupportApi response:", response.data);
      
      const result = response.data;   
      return result;
    } catch (error) {
      // console.error("HelpAndSupportApi error:", error);
      return error?.response?.data;
    }
  }
);