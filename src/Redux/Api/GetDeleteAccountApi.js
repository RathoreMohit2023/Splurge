import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, DeleteAccount_Url} from "../NWConfig";

export const DeleteAccountApi = createAsyncThunk(
    'DeleteAccount',
    async ({token, email}, {rejectWithValue}) => {
        try{
            const response = await axios.delete(
                `${BASE_URL}${DeleteAccount_Url}?email=${email}`, 
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            const result = response.data;
            console.log("DeleteAccountApi result", result)

            return result;
        }
        catch(error){
            console.error("DeleteAccountApi error:", error.response?.data);
            return rejectWithValue(error.response?.data);
        }
    }
);