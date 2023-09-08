import { Coordinate, GameStatus, Minesweeper } from "minesweeper-redux";

export type CellMouseEvent = (e: React.MouseEvent, coordinate: Coordinate) => void;
export type Level = "beginner" | "intermediate" | "expert" | "expert(vertical)";
export type Theme = "auto" | "dark" | "light";
export type PlayRecord = {
  duration: number;
  timestamp: number;
  level: Level;
  game: Minesweeper;
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
}
