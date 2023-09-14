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
    toggleMini(state) {
      state.minimized = !state.minimized;
    },
    toggleSound(state) {
      state.sound = !state.sound;
    },
    toggleMiniRecords(state) {
      state.recordWindowMinimized = !state.recordWindowMinimized;
    },
    setElapsedTime(state, action: PayloadAction<number>) {
      // +1
      state.elapsedTime = action.payload;
    },
    resetElapsedTime(state) {
      state.elapsedTime = 0;
    },
    updateCellSize(state, action: PayloadAction<number>) {
      state.cellSize = action.payload;
    },
    addRecord(state, action: PayloadAction<Omit<PlayRecord, "timestamp" | "duration" | "level">>) {
      // 时间太短，不予统计
      if (state.elapsedTime <= 1) return;
      const record: PlayRecord = {
        timestamp: new Date().getTime(),
        duration: state.elapsedTime,
        level: state.level,
        ...action.payload
      };
      state.records = [record, ...state.records];
    },
    removeRecord(state, action: PayloadAction<number>) {
      state.records = state.records.filter((r) => r.timestamp !== action.payload);
    }
  }
});

export const {
  removeRecord,
  toggleSound,
  fillUserData,
  resetUserData,
  updateLevel,
  updateCellSize,
  setElapsedTime,
  resetElapsedTime,
  toggleMini,
  toggleMiniRecords,
  updateCellActive,
  addRecord
} = userDataSlice.actions;
export default userDataSlice.reducer;
