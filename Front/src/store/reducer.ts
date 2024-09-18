import { combineReducers } from "@reduxjs/toolkit";
import searchSlice from "../slices/searchSlice";

const rootReducer = combineReducers({
    search: searchSlice.reducer,

});


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;