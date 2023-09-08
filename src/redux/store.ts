import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "minesweeper-redux";
import userDataReducer from "./slice/user.data";

const store = configureStore({
  reducer: {
    minesweeper: gameReducer,
    userData: userDataReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
