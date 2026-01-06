import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetMonthlyBudget_Url } from '../NWConfig';

const url = `${BASE_URL}${GetMonthlyBudget_Url}`;

export const GetMonthlyBudgetApi = createAsyncThunk(
  'GetMonthlyBudgetApi',
  async ({token, id}) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url + id, {
        headers,
      });
      // console.log("GetMonthlyBudgetApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("GetMonthlyBudgetApi Api error:", error.response?.data);
      return error?.response?.data;
    }
  }
);