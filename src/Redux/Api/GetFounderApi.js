import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetFounders_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const GetFounderApi = createAsyncThunk(
  'GetFounderApi',
  async (token) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${GetFounders_Url}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      )
      // console.log("Response from GetFounderApi:", response.data);
      return response.data;
    } catch (error) {
      // console.log('❌ Error in GetFounderApi:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
);