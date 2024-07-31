import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Verify {
  isVerify: boolean;
}

interface EmailState {
  isVerify: boolean;
}

const initialState: EmailState = {
  isVerify: false,
}

const VerifySlice = createSlice({
  name: "Verify",
  initialState,
  reducers: {
    setVerify(state, action: PayloadAction<Verify>) {
      state.isVerify = action.payload.isVerify;
    },
  },
});

// Export the slice
export const { setVerify } = VerifySlice.actions;
export default VerifySlice.reducer;
