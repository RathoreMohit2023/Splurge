import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, AddMonthlyBudget_Url } from '../NWConfig';

const url = `${BASE_URL}${AddMonthlyBudget_Url}`;

export const AddMonthlyBudgetApi = createAsyncThunk(
  'AddMonthlyBudgetApi',
  async ({formData, token}) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url, formData, {
        headers
      });
      // console.log("Response from AddMonthlyBudgetApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      return error?.response?.data;
    }
  }
);