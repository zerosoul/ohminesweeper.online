import { Coordinate, Difficulty, Minesweeper } from "@minesweeper";
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
// eslint-disable-next-line no-unused-vars
export type CellMouseEvent = (e: React.MouseEvent, coordinate: Coordinate) => void;
export type Level = "beginner" | "intermediate" | "expert" | "custom";
export type Theme = "auto" | "dark" | "light";
export type UI = "win98" | "xp";
export type Sound = "tick" | "start" | "win" | "loss";
export type SiteMap = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};
export type ArticleName =
  | "no-flag"
  | "first-click"
  | "how-to-play"
  | "guess"
  | "efficiency"
  | "more-tips"
  | "advance-patterns"
  | "how-to-install-pwa"
  | "";
export type PlayRecord = {
  timestamp: number;
  duration: number;
  level: Level;
  // numFlagged: number;
  // remainingFlags: number;
} & DeepWriteable<Minesweeper>;
export type UserInfo = {
  name: string;
  email: string;
};
export interface UserData {
  ui: UI;
  article: ArticleName;
  custom: Difficulty;
  sound: boolean;
  minimized: boolean;
  recordWindowMinimized: boolean;
  user?: UserInfo;
  level: Level;
  cellSize: number;
  records: PlayRecord[];
  cellActive: boolean;
}
