import { Level, UserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserData = {
  minimized: false,
  level: "beginner",
  cellSize: 30,
  elapsedTime: 0,
  records: [],
  cellActive: false
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    resetUserData() {
      return initialState;
    },
    updateLevel(state, action: PayloadAction<Level>) {
      state.level = action.payload;
    },
    updateCellActive(state, action: PayloadAction<boolean>) {
      if (state.cellActive === action.payload) return;
      state.cellActive = action.payload;
    },
    updateMini(state, action: PayloadAction<boolean>) {
      if (state.minimized === action.payload) return;
      state.minimized = action.payload;
    },
    tickElapsedTime(state) {
      // +1
      state.elapsedTime++;
    },
    resetElapsedTime(state) {
      state.elapsedTime = 0;
    },
    updateCellSize(state, action: PayloadAction<number>) {
      state.cellSize = action.payload;
    }
  }
});

export const {
  resetUserData,
  updateLevel,
  updateCellSize,
  tickElapsedTime,
  resetElapsedTime,
  updateMini,
  updateCellActive
} = userDataSlice.actions;
export default userDataSlice.reducer;
