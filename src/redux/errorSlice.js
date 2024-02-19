import {createSlice} from "@reduxjs/toolkit";

const errorSlice = createSlice(
    {
        name: 'error',
        initialState: {code: 'OK'},
        reducers:
            {
                setCode: (state, action) => {state.code = action.payload},
                resetCode: state => state.code = 'OK'
            }
    }
);

export const {setCode, resetCode} = errorSlice.actions;
export default errorSlice.reducer;