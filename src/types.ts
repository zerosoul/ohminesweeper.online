import { Coordinate, GameStatus, Minesweeper } from "minesweeper-redux";

export type CellMouseEvent = (e: React.MouseEvent, coordinate: Coordinate) => void;
export type Level = "beginner" | "intermediate" | "expert" | "custom";
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
  user?: UserInfo;
  level: Level;
  cellSize: number;
  records: PlayRecord[];
}
