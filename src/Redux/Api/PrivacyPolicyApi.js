import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, PrivacyPolicyApi_Url } from '../NWConfig';

const url = `${BASE_URL}${PrivacyPolicyApi_Url}`;

export const PrivacyPolicyApi = createAsyncThunk(
  'PrivacyPolicyApi',
  async (token) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url, {
        headers,
      });
      // console.log("PrivacyPolicyApiApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.error("PrivacyPolicyApiApi error:", error);
      return error?.response?.data;
    }
  }
);