import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from './chatSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        selectChat : chatReducer
    },
});

export default store;