import axios from "axios";
import { BASE_URL, SignUp_Url } from "../NWConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

const Url = `${BASE_URL}${SignUp_Url}`;

export const SignUpApi = createAsyncThunk(
    'SignUpApi',
    async (PostData) => {
        const token = await AsyncStorage.getItem('Token');
        const parsedToken = JSON.parse(token);
        const headers = {
            "Content-Type" : "multipart/form-data",
            "Authorization" : `Bearer ${parsedToken}`
        }

        try{
            const response = await axios.post(Url, PostData, { headers});
            // console.log("Response from LoginApi:", response.data);

            const result = response.data
            return result;
        }
        catch(error){
           return error?.response?.data;
        }
    }
);