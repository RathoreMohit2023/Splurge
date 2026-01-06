import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, AddGroupExpense_Url } from '../NWConfig';

const url = `${BASE_URL}${AddGroupExpense_Url}`;

export const AddGroupExpenseApi = createAsyncThunk(
  'AddGroupExpenseApi',
  async ({payload, token, groupId}) => {
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url + groupId, payload, {
        headers
      });
      // console.log("Response from AddGroupExpenseApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.log('Error in AddGroupExpenseApi:', error.response.data);
      
     return error?.response?.data
    }
  }
);