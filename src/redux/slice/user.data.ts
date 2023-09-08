import { Level, UserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserData = {
  minimized: false,
  level: "beginner",
  cellSize: 30,
  elapsedTime: 0,
  records: []
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
    updateMini(state, action: PayloadAction<boolean>) {
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
  updateMini
} = userDataSlice.actions;
export default userDataSlice.reducer;
