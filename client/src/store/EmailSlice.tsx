import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Email {
  email: string;
}

interface EmailState {
  email: string;
}

const initialState: EmailState = {
  email: "",
}

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<Email>) {
      state.email = action.payload.email;
    },
  },
});

// Export the slice
export const { setEmail } = emailSlice.actions;
export default emailSlice.reducer;
