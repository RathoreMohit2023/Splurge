import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, DeleteTransaction_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${DeleteTransaction_Url}`;

export const DeleteTransactionApi = createAsyncThunk(
  'DeleteTransactionApi',
  async ({token, id}) => {
    const headers = {
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.delete(url + id, {
        headers
      });

      const result = response.data;
      // console.log("DeleteTransactionApi result", result);
      
      return result;
    } catch (error) {
      // console.error("DeleteTransactionApi error:", error.response.data);
    return error.response.data;
    }
  }
);