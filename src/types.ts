import { CellStatus, Coordinate, GameStatus, Grid } from "minesweeper-redux";

// eslint-disable-next-line no-unused-vars
export type CellMouseEvent = (e: React.MouseEvent, coordinate: Coordinate) => void;
export type Level = "beginner" | "intermediate" | "expert" | "expert(vertical)";
export type Theme = "auto" | "dark" | "light";
export type PlayRecord = {
  timestamp: number;
  status: GameStatus;
  numCells: number;
  duration: number;
  level: Level;
  grid: any;
  // numFlagged: number;
  // remainingFlags: number;
};
export type UserInfo = {
  name: string;
  email: string;
};
export interface UserData {
  minimized: boolean;
  user?: UserInfo;
  level: Level;
  elapsedTime: number;
  cellSize: number;
  records: PlayRecord[];
  cellActive: boolean;
}
