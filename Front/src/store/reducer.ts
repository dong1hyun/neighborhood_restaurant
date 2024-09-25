import { combineReducers } from "@reduxjs/toolkit";
import searchSlice from "../slices/searchSlice";
import nickNameSlice from "../slices/nickNameSlicke";

const rootReducer = combineReducers({
    search: searchSlice.reducer,
    nickName: nickNameSlice.reducer,
});


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;