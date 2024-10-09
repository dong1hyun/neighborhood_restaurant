import { createSlice } from "@reduxjs/toolkit";

const nickNameSlice = createSlice({
    name: 'nickName',
    initialState: {nickName: ''},
    reducers: {
        setNickName(state, action) {
            state.nickName = action.payload;
        }
    }
});

export default nickNameSlice;