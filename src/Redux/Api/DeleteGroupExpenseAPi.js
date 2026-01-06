import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, DeleteGroupExpense_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${DeleteGroupExpense_url}`;

export const DeleteGroupExpenseApi = createAsyncThunk(
  'DeleteGroupExpenseApi',
  async ({token, id}) => {
    const headers = {
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.delete(url + id, {
        headers
      });

      const result = response.data;
      // console.log("DeleteGroupExpenseApi result", result);
      
      return result;
    } catch (error) {
      console.error("DeleteGroupExpenseApi error:", error.response.data);
     throw error;
    }
  }
);