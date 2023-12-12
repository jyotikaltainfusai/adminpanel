import axiosInstance from "../../../utils/axiosInstance";

export const registerUserthunk = async(url,data,thunkAPI)=>{
    try {
        const resp = await axiosInstance.post(url,data);
        return resp.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response)
        
    }
}


export const adminLoginthunk = async(url,data,thunkAPI)=>{
    try {
        const resp = await axiosInstance.post(url,data);
        return resp.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response)
        
    }
}


export const getClientDetailsThunk = async(url,data,thunkAPI)=>{
    try {
        const resp = await axiosInstance.get(url);
        return resp.data?.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response)
    }
}