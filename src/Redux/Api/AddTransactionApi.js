import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, AddTransaction_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${AddTransaction_Url}`;

export const AddTransactionApi = createAsyncThunk(
  'AddTransactionApi',
  async ({ formData, token }) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url, formData, {
        headers
      });
      // console.log("Response from AddTransactionApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.log('Error in AddTransactionApi:', error.response.data);
      return error?.response?.data;
    }
  }
);