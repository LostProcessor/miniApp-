import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'
import campaignReducer from './slices/campaignSlice'

const  store = configureStore({
    reducer:{
        user:userReducer,
        campaign:campaignReducer

    }
})

export default store