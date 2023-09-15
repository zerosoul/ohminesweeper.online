import { defaultCustom, difficulty } from "@/config";
import { Level, PlayRecord, UserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Difficulty } from "@minesweeper";

const initialState: UserData = {
  custom: defaultCustom,
  sound: false,
  minimized: false,
  recordWindowMinimized: true,
  level: "beginner",
  cellSize: 30,
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
    updateCustom(state, action: PayloadAction<Difficulty>) {
      state.custom = action.payload;
      difficulty.custom = action.payload;
      console.log("update custom", difficulty.custom);
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
    updateCellSize(state, action: PayloadAction<number>) {
      state.cellSize = action.payload;
    },
    addRecord(state, action: PayloadAction<Omit<PlayRecord, "timestamp" | "level">>) {
      const { duration, ...rest } = action.payload;
      // 时间太短，不予统计
      if (duration <= 1) return;
      const record: PlayRecord = {
        timestamp: new Date().getTime(),
        duration,
        level: state.level,
        ...rest
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
  updateCustom,
  toggleSound,
  fillUserData,
  resetUserData,
  updateLevel,
  updateCellSize,
  toggleMini,
  toggleMiniRecords,
  updateCellActive,
  addRecord
} = userDataSlice.actions;
export default userDataSlice.reducer;
