import axios from "axios";
import { BASE_URL, Forgote_Url } from "../NWConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

const Url = `${BASE_URL}${Forgote_Url}`;

export const ForgoteApi = createAsyncThunk(
    'ForgoteApi',
    async (PosttData, { rejectWithValue }) => {

        // const token = await AsyncStorage.getItem('Token');
        // const parseToken = JSON.parse(token)
        // const headers = {
        //     "Content-Type" : "multiPart/form-data",
        //     "Authorization" : `Bearer ${parseToken}`
        // }

        try{
            const response = await axios.post(Url, PosttData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            // console.log("Response from ForgoteApi:", response.data);
      
            const result = response.data;
            return result;
        }
        catch(error){
            // console.log('Error in ForgoteApi:', error.response.data)
            return rejectWithValue(
                error?.response?.data || "Something went wrong"
            );
        }
    }
);