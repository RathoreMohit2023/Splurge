import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, DeleteGroupMember_Url } from '../NWConfig';

const url = `${BASE_URL}${DeleteGroupMember_Url}`;

export const DeleteGroupMemberApi = createAsyncThunk(
  'DeleteGroupMemberApi',
  async ({payload, token}) => {
    
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    
    try {
      const response = await axios.post(url, payload, {
        headers
      });
      // console.log("Response from DeleteGroupMemberApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      return error?.response?.data;
    }
  }
);