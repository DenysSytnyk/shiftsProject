import {createSlice} from "@reduxjs/toolkit";

const statusPageSlice = createSlice(
    {
        name: 'page',
        initialState: {page: 'in'},
        reducers:
            {
                setPage: (state, action) => {state.page = action.payload}
            }
    }
);

export const {setPage} = statusPageSlice.actions;
export default statusPageSlice.reducer;