import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, DeleteGroup_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${DeleteGroup_url}`;

export const DeleteGroupApi = createAsyncThunk(
  'DeleteGroupApi',
  async ({token, id}) => {
    const headers = {
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.delete(url + id, {
        headers
      });

      const result = response.data;
      // console.log("DeleteGroupApi result", result);
      
      return result;
    } catch (error) {
      console.error("DeleteGroupApi error:", error.response.data);
     throw error;
    }
  }
);