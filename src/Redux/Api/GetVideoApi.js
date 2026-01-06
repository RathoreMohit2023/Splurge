import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetVideos_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetvideoApi = createAsyncThunk(
  'GetvideoApi',
  async (token) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${GetVideos_Url}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      )
      // console.log("Response from GetvideoApi:", response.data);
      return response.data;
    } catch (error) {
      // console.log('❌ Error in GetvideoApi:', error.response ? error.response.data : error.message);
      return error.response.data;
    }
  }
);