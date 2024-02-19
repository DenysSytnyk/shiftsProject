import {configureStore} from "@reduxjs/toolkit";
import auth from './authSlice';
import error from './errorSlice';
import page from './statusPageSlice';


export const store = configureStore({
    reducer:{auth, error, page}
});

