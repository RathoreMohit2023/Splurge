import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetGroupExpense_Url } from '../NWConfig';

const url = `${BASE_URL}${GetGroupExpense_Url}`;

export const GetGroupExpenseApi = createAsyncThunk(
  'GetGroupExpenseApi',
  async ({token, id}) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url + id, {
        headers,
      });
      // console.log("GetGroupExpenseApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("GetGroupExpenseApi error:", error);
      return error?.response?.data;
    }
  }
);