import { Level, PlayRecord, UserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserData = {
  sound: false,
  minimized: false,
  recordWindowMinimized: true,
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
    updateSound(state, action: PayloadAction<boolean>) {
      if (state.sound === action.payload) return;
      state.sound = action.payload;
    },
    updateMiniRecords(state, action: PayloadAction<boolean>) {
      if (state.recordWindowMinimized === action.payload) return;
      state.recordWindowMinimized = action.payload;
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
    addRecord(state, action: PayloadAction<Omit<PlayRecord, "timestamp" | "duration" | "level">>) {
      const record: PlayRecord = {
        timestamp: new Date().getTime(),
        duration: state.elapsedTime,
        level: state.level,
        ...action.payload
      };
      state.records = [record, ...state.records];
    }
  }
});

export const {
  updateSound,
  fillUserData,
  resetUserData,
  updateLevel,
  updateCellSize,
  tickElapsedTime,
  resetElapsedTime,
  updateMini,
  updateMiniRecords,
  updateCellActive,
  addRecord
} = userDataSlice.actions;
export default userDataSlice.reducer;
