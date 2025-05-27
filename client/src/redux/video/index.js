import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import axios from "axios";

 const initialState = {
    isLoading : false,
    videoContent : [],
    video : {}
 }

 export const CreateVideo = createAsyncThunk(
  'video/create',
  async (formDataObj) => {
    try {
      let response;

      if (formDataObj.type === 'short' && formDataObj.videoFile) {
        // Handle file upload
        const formData = new FormData();
        formData.append('title', formDataObj.title);
        formData.append('description', formDataObj.description);
        formData.append('type', formDataObj.type);
        formData.append('price', formDataObj.price);
        formData.append('videoFile', formDataObj.videoFile);

        response = await axios.post('/api/video/createshort', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Long-form (no file)
        response = await axios.post('/api/video/createlong', {
          title: formDataObj.title,
          description: formDataObj.description,
          type: formDataObj.type,
          price: formDataObj.price,
          videoUrl: formDataObj.videoUrl,
        });
      }

      return response.data;
    } catch (error) {
      return { error: error.response?.data || 'Something went wrong' };
    }
  }
);


export const fetchVideos = createAsyncThunk(
   'video/fetch', 
   async({startIndex, limit})=>{
      try {
         const {data} = await axios.get(`/api/video/fetch?limit=${limit}&startIndex=${startIndex}`)
          return data
      } catch (error) {
         return { error: error.response.data };
      }
   }
 )

 export const PurchaseVideo = createAsyncThunk(
   'video/purchase', 
   async({videoId,videoPrice})=>{
      try {
         const {data} = await axios.post(`/api/video/purchase/${videoId}`,{
           pricePaid: videoPrice
         })
          return data
      } catch (error) {
         return { error: error.response.data };
      }
   }
 )

 export const fetchSingle = createAsyncThunk(
   'video/singlefetch', 
   async({videoId})=>{
      try {
         const {data} = await axios.get(`/api/video/details/${videoId}`)
          return data
      } catch (error) {
         return { error: error.response.data };
      }
   }
 )
 

 const videoSlice = createSlice({
    name : 'video',
    initialState,
    reducers : {
   resetVideos: (state) => {
    state.videoContent = [];
  }
    },
    extraReducers : (builder)=>{
      builder
      .addCase(CreateVideo.pending, (state)=>{
         state.isLoading = true
      }).addCase(CreateVideo.fulfilled, (state,action)=>{
         state.isLoading = false;
      }).addCase(CreateVideo.rejected, (state)=>{
         state.isLoading = false;
      })
      .addCase(fetchVideos.pending, (state)=>{
         state.isLoading = true
      }).addCase(fetchVideos.fulfilled, (state,action)=>{
         state.isLoading = false;
         state.videoContent = [...state.videoContent, ...action.payload.data];
      }).addCase(fetchVideos.rejected, (state)=>{
         state.isLoading = false;
      })
      .addCase(PurchaseVideo.pending, (state)=>{
         state.isLoading = true
      }).addCase(PurchaseVideo.fulfilled, (state,action)=>{
         state.isLoading = false;
      }).addCase(PurchaseVideo.rejected, (state)=>{
         state.isLoading = false;
      })
      .addCase(fetchSingle.pending, (state)=>{
         state.isLoading = true
      }).addCase(fetchSingle.fulfilled, (state,action)=>{
         state.isLoading = false;
         state.video = action.payload.data
      }).addCase(fetchSingle.rejected, (state)=>{
         state.isLoading = false;
      })
    }
 })

 export const { resetVideos } = videoSlice.actions;
 export default videoSlice.reducer 