import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { adminLoginthunk, getClientDetailsThunk, registerUserthunk } from "./userThunk";
import { addToLocalStorage } from "utils/localStorage";

const initialState ={
    isLoading:false,
    userInfo:{
        data:null,
        info:null,
    },
    clients:[],
    authToken:null,
    isLoggedIn:false,

}

export const registerUser = createAsyncThunk(
    'user/createuser',
    async(data,thunkApi)=>{
        return registerUserthunk('/admin/admin-login',data,thunkApi);
    }
)

export const adminLogin = createAsyncThunk(
    'user/admin-login',
    async(data,thunkApi)=>{
        return adminLoginthunk('/admin/admin-login',data,thunkApi);
    }
)

export const getClientDetails = createAsyncThunk(
    'clients/clientdetails',
    async(data,thunkApi)=>{
        return getClientDetailsThunk('/admin/client',data,thunkApi)

    }
)

 

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginSomething:(state)=>{
            state.isLoading = true;
        },
    },
    extraReducers:(builder)=>{

        builder
        .addCase(registerUser.pending,(state)=>{
            // toast.warning("login pending");
        })
        .addCase(registerUser.fulfilled,(state,{payload})=>{
            state.userInfo.data = payload;
            toast.success('created succesfully')
        })
        .addCase(registerUser.rejected,(state,{payload})=>{
            console.log('rejected data',payload)
            toast.error('user creation failed')
        });


        builder
        .addCase(adminLogin.pending,(state)=>{
            // toast.warning("login pending");
        })
        .addCase(adminLogin.fulfilled,(state,{payload})=>{
            state.userInfo.data = payload;
            toast.success('login succesfully')
            console.log('payloaddata',payload)
            addToLocalStorage(payload?.tokens?.access?.token,'token')
        })
        .addCase(adminLogin.rejected,(state,{payload})=>{
            console.log('rejected data',payload)
            toast.error('login failed')
        });

        builder
        .addCase(getClientDetails.pending,(state)=>{

        })
        .addCase(getClientDetails.fulfilled,(state,{payload})=>{
            state.clients = payload;
            console.log('clientdetails',payload)
        })
        .addCase(getClientDetails.rejected,(state,{payload})=>{
            console.log('client error',payload)
        })
    }

})


export const {loginSomething}= userSlice.actions;
export default userSlice.reducer;