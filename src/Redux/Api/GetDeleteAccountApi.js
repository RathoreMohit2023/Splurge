import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, DeleteAccount_Url } from '../NWConfig';

const url = `${BASE_URL}${DeleteAccount_Url}`;

export const DeleteAccountApi = createAsyncThunk(
  'DeleteAccount',
  async ({ token, postData }) => {

    try {
        const response = await axios.delete(url, {
            data: postData, 
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            }
          });
          

      const result = response.data;

      return result;
    } catch (error) {
      return error?.response?.data;
    }
  },
);
