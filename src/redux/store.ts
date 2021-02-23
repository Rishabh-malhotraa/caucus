import { configureStore } from "@reduxjs/toolkit";
import AppDataReducer from "redux/slices/AppDataSlice";

const store = configureStore({
  reducer: {
    appData: AppDataReducer,
  },
});

export default store;
