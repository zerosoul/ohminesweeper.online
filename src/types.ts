import { Coordinate } from 'minesweeper-redux'

export type CellMouseEvent = (e: React.MouseEvent, coordinate: Coordinate) => void
export type Level = "beginner" | "intermediate" | "expert"