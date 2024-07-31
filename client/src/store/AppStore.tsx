import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const appStore = configureStore({
  reducer: {
    
  },
});

// export type RootState = ReturnType<typeof appStore.getState>;
// export type AppDispatch = typeof appStore.dispatch;

export const useAppDispatch:()=> typeof appStore.dispatch = useDispatch
export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof appStore.getState>>=useSelector

export default appStore;
