import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./slice/minesweeper";
import userDataReducer from "./slice/user.data";
import { listenerMiddleware } from "./listenerMiddleware";

const store = configureStore({
  reducer: {
    minesweeper: gameReducer,
    userData: userDataReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).prepend(listenerMiddleware.middleware),
  devTools: process.env.NODE_ENV == "development"
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
