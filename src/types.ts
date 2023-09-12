import { Coordinate, Minesweeper } from "minesweeper-redux";
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
// eslint-disable-next-line no-unused-vars
export type CellMouseEvent = (e: React.MouseEvent, coordinate: Coordinate) => void;
export type Level = "beginner" | "intermediate" | "expert" | "expert(vertical)";
export type Theme = "auto" | "dark" | "light";
export type PlayRecord = {
  timestamp: number;
  duration: number;
  level: Level;
  // numFlagged: number;
  // remainingFlags: number;
} & Omit<DeepWriteable<Minesweeper>, "timerCallback" | "timerStopper" | "elapsedTime">;
export type UserInfo = {
  name: string;
  email: string;
};
export interface UserData {
  minimized: boolean;
  recordWindowMinimized: boolean;
  user?: UserInfo;
  level: Level;
  elapsedTime: number;
  cellSize: number;
  records: PlayRecord[];
  cellActive: boolean;
}
