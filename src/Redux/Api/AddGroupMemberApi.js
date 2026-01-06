import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, AddGroupMember_Url } from '../NWConfig';

const url = `${BASE_URL}${AddGroupMember_Url}`;

export const AddGroupMemberApi = createAsyncThunk(
  'AddGroupMemberApi',
  async ({payload, token}) => {
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.post(url, payload, {
        headers
      });
      // console.log("Response from AddGroupMemberApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
     return error?.response?.data
    }
  }
);