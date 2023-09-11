import { Level, PlayRecord, UserData } from "@/types";
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
    fillUserData(state, action: PayloadAction<Partial<UserData>>) {
      const newState = { ...state, ...action.payload };
      return newState;
    },
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
    },
    addRecord(state, action: PayloadAction<Pick<PlayRecord, "numCells" | "status" | "grid">>) {
      const { status, numCells, grid } = action.payload;
      const record: PlayRecord = {
        timestamp: new Date().getTime(),
        duration: state.elapsedTime,
        level: state.level,
        status,
        numCells,
        grid
      };
      state.records = [record, ...state.records];
    }
  }
});

export const {
  fillUserData,
  resetUserData,
  updateLevel,
  updateCellSize,
  tickElapsedTime,
  resetElapsedTime,
  updateMini,
  updateCellActive,
  addRecord
} = userDataSlice.actions;
export default userDataSlice.reducer;
