import axios from "axios";
import { BASE_URL, Forgote_Url } from "../NWConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

const Url = `${BASE_URL}${Forgote_Url}`;

export const ForgoteApi = createAsyncThunk(
    'ForgoteApi',
    async (PosttData, { rejectWithValue }) => {
        try{
            const response = await axios.post(Url, PosttData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log("Response from ForgoteApi:", response.data);
      
            const result = response.data;
            return result;
        }
        catch(error){
            console.log('Error in ForgoteApi:', error.response.data)
            return rejectWithValue(
                error?.response?.data || "Something went wrong"
            );
        }
    }
);