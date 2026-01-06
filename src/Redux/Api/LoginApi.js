import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Login_Url, Google_Url } from '../NWConfig';

const url = `${BASE_URL}${Login_Url}`;
const GoogleUrl = `${BASE_URL}${Google_Url}`

export const LoginApi = createAsyncThunk(
  'LoginApi',
  async (PostData) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
    }
    try {
      const response = await axios.post(url, PostData, {
        headers
      });
      // console.log("Response from LoginApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.log('Error in LoginApi:', error.response.data);
      return error?.response?.data;
    }
  }
);

export const GoogleLoginApi = createAsyncThunk(
  'GoogleLoginApi',
  async (PostData) => {
    const headers = {
        "Content-Type" : "multipart/form-data",
    }
    try {
      const response = await axios.post(GoogleUrl, PostData, {
        headers
      });
      // console.log("Response from GoogleLoginApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.log('Error in GoogleLoginApi:', error.response.data);
      return error?.response?.data;
    }
  }
);