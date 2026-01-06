import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,  EditWishlist_Url } from '../NWConfig';

const url = `${BASE_URL}${ EditWishlist_Url}`;

export const  EditWishlistApi = createAsyncThunk(
  ' EditWishlistApi',
  async ({formData, token, id}) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url + id, formData, {
        headers
      });
      // console.log("Response from  EditWishlistApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      // console.log('Error in  EditWishlistApi:', error.response.data);
    }
  }
);