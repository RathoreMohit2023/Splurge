import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetTransection_Url } from '../NWConfig';

const url = `${BASE_URL}${GetTransection_Url}`;

export const GetTransectionApi = createAsyncThunk(
  'GetTransection',
  async ({token, id}) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url + id, {
        headers,
      });
      // console.log("GetTransectionApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
    //  console.log('Error in GetTransectionApi:', error.response.data);
    return error?.response?.data;
     
    }
  }
);