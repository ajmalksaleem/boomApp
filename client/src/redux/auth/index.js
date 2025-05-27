import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import axios from "axios";

 const initialState = {
    isAuthenticated : false,
    isLoading : false,
    user : null
 }

 export const SignUpAction = createAsyncThunk(
   'auth/signup', 
   async(formData)=>{
      try {
         const {data} = await axios.post('/api/auth/signup', formData)
          return data
      } catch (error) {
         return { error: error.response.data };
      }
   }
 )

 export const SigInAction = createAsyncThunk(
   'auth/signin', 
   async(formData)=>{
      try {
         const {data} = await axios.post('/api/auth/signin', formData)
          return data
      } catch (error) {
         return { error: error.response.data };
      }
   }
 )


 export const CheckAuth = createAsyncThunk(
   'auth/checkauth', 
   async(formData)=>{
      try {
         const {data} = await axios.get('/api/auth/check-auth',{
            withCredentials : true,
            headers : {
               'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate',
            }
         })
          return data
      } catch (error) {
         return { error: error.response.data };
      }
   }
 )

 export const logoutUser = createAsyncThunk(
   "/auth/logout",
   async () => {
     const response = await axios.post(
       "/api/auth/logout",
       {
         withCredentials: true,
       }
     );
     return response.data;
   }
 );

 const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
    },
    extraReducers : (builder)=>{
      builder.addCase(SignUpAction.pending, (state)=>{
         alert('stage 3')
         state.isLoading = true
      }).addCase(SignUpAction.fulfilled, (state,action)=>{
         state.isLoading = false;
      }).addCase(SignUpAction.rejected, (state)=>{
         state.isLoading = false;
      }).addCase(SigInAction.pending, (state)=>{
         state.isLoading = true
      }).addCase(SigInAction.fulfilled, (state,action)=>{
         state.isLoading = false
         state.user = action.payload.success ? action.payload.user : null
         state.isAuthenticated = action.payload.success ? true : false
      }).addCase(SigInAction.rejected, (state)=>{
         state.user = null;
         state.isAuthenticated = false
         state.isLoading = false
      }).addCase(CheckAuth.pending, (state)=>{
         state.isLoading = true;
      }).addCase(CheckAuth.fulfilled, (state,action)=>{
         state.user = action.payload.success ? action.payload.user : null
         state.isAuthenticated = action.payload.success ? true : false
         state.isLoading = false
      }).addCase(CheckAuth.rejected, (state)=>{
         state.user = null;
         state.isAuthenticated = false
         state.isLoading = false
      }).addCase(logoutUser.fulfilled, (state) => {
         state.isLoading = false;
         state.user = null;
         state.isAuthenticated = false;
       });
    }
 })

 export default authSlice.reducer 