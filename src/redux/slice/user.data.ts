import { defaultCustom, difficulty } from "@/config";
import { ArticleName, Level, PlayRecord, UI, UserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Difficulty } from "@minesweeper";

const initialState: UserData = {
  ui: "win98",
  article: "",
  custom: defaultCustom,
  sound: false,
  minimized: false,
  feedbackVisible: false,
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
      // 更新自定义设置
      difficulty.custom = newState.custom;
      return newState;
    },
    resetUserData() {
      // 更新自定义设置
      difficulty.custom = defaultCustom;
      return initialState;
    },
    updateUI(state, action: PayloadAction<UI>) {
      state.ui = action.payload;
    },
    updateArticle(state, action: PayloadAction<ArticleName>) {
      state.article = action.payload;
    },
    updateFeedback(state, action: PayloadAction<boolean>) {
      state.feedbackVisible = action.payload;
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
  updateUI,
  updateArticle,
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
  addRecord,
  updateFeedback
} = userDataSlice.actions;
export default userDataSlice.reducer;
