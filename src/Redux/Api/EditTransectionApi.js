import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,  EditTransection_Url } from '../NWConfig';

const url = `${BASE_URL}${ EditTransection_Url}`;

export const  EditTransectionApi = createAsyncThunk(
  ' EditTransectionApi',
  async ({formData, token, id}) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url + id, formData, {
        headers
      });
      // console.log("Response from  EditTransectionApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.log('Error in  EditTransectionApi:', error.response.data);
    }
  }
);