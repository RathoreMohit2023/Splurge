import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, EditProfile_Url } from '../NWConfig';

const url = `${BASE_URL}${EditProfile_Url}`;

export const EditProfileApi = createAsyncThunk(
  'EditProfileApi',
  async ({ formData, token }) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(url, formData, {
        headers,
      });
      // console.log('Response from EditProfileApi:', response.data);
      const result = response.data;
      return result;
    } catch (error) {
      // console.log('Error in EditProfileApi:', error.response.data);
      
      return error?.response?.data;
    }
  },
);