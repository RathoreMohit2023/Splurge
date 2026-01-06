import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetPaymentLog_Url } from '../NWConfig';

const url = `${BASE_URL}${GetPaymentLog_Url}`;

export const GetPaymentLogApi = createAsyncThunk(
  'GetPayment',
  async (token) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url, {
        headers,
      });
      // console.log("GetPaymentLogApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("GetPaymentLogApi error:", error);
      return error?.response?.data;
    }
  }
);