import { configureStore } from "@reduxjs/toolkit";
import themeSlice from '../redux/theme/index'
import authSlice from './auth/index'
import videoSlice from './video/index'

const store = configureStore({
    reducer :{
        theme : themeSlice,
        auth : authSlice,
        video : videoSlice
    }
})

export default store