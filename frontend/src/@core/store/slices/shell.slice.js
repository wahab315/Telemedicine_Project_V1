import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarCollapsed: false
};

const shellSlice = createSlice({
  name: "shell",
  initialState,
  reducers: {
    setSidebarCollapsed(state, action) {
      state.sidebarCollapsed = action.payload;
    },
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    }
  }
});

export const { setSidebarCollapsed, toggleSidebarCollapsed } =
  shellSlice.actions;
export const shellReducer = shellSlice.reducer;
