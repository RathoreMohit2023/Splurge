import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, AddPaymentLog_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${AddPaymentLog_Url}`;

export const AddPaymentLogApi = createAsyncThunk(
  'AddPaymentLogApi',
  async ({formData, token}) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url, formData, {
        headers
      });
      // console.log("Response from AddPaymentLogApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
     return error?.response?.data;
    }
  }
);