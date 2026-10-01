import { shellReducer } from "@core/store/slices/shell.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    shell: shellReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});
