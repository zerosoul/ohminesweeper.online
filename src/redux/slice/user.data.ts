import { Level, UserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserData = {
  level: "beginner",
  cellSize: 30,
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
    updateCellSize(state, action: PayloadAction<number>) {
      state.cellSize = action.payload;
    }
  }
});

export const { resetUserData, updateLevel, updateCellSize } = userDataSlice.actions;
export default userDataSlice.reducer;
