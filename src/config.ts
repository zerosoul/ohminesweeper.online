import { Difficulty } from "minesweeper-redux";
import { Level } from "./types";

export const difficulty: Record<Level, Difficulty> = {
    beginner: {
        width: 9,
        height: 9,
        numMines: 10
    },
    intermediate: {
        width: 16,
        height: 16,
        numMines: 40
    },
    expert: {
        width: 30,
        height: 30,
        numMines: 180
    },
}