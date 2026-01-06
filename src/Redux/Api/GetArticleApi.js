import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetArticle_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const GetArticleApi = createAsyncThunk(
  'GetArticleApi',
  async (token) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${GetArticle_Url}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      )
      // console.log("Response from GetArticleApi:", response.data);
      return response.data;
    } catch (error) {
      // console.log('Error in GetArticleApi:', error.response.data);
    }
  }
);