import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {keyword: ''},
    reducers: {
        setKeyword(state, action) {
            state.keyword = action.payload;
        }
    }
});

export default searchSlice;