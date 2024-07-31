import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Load {
  isLoad: boolean;
}

interface EmailState {
  isLoad: boolean;
}

const initialState: EmailState = {
  isLoad: false,
}

const LoadSlice = createSlice({
  name: "Load",
  initialState,
  reducers: {
    setLoad(state, action: PayloadAction<Load>) {
      state.isLoad = action.payload.isLoad;
    },
  },
});

// Export the slice
export const { setLoad } = LoadSlice.actions;
export default LoadSlice.reducer;
