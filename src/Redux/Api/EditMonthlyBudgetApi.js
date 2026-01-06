import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, EditMonthlyBudget_Url } from '../NWConfig';

const url = `${BASE_URL}${EditMonthlyBudget_Url}`;

export const EditMonthlyBudgetApi = createAsyncThunk(
  'EditMonthlyBudgetApi',
  async ({formData, token, id}) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url + id, formData, {
        headers
      });
      // console.log("Response from EditMonthlyBudgetApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      return error?.response?.data;
    }
  }
);