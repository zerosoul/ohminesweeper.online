import {
  createInitialGrid,
  flagAllMineCells,
  initiateGrid,
  isWinGrid,
  revealCellInGrid,
  setLoseState,
  toggleFlagInGrid,
} from './grid'
import { Difficulty, Minesweeper, Coordinate } from './types'

/** Create a minesweeper game. */
export function startGame(randSeed: number, difficulty: Difficulty): Minesweeper {
  return {
    difficulty,
    numCells: difficulty.height * difficulty.width,
    grid: createInitialGrid(difficulty.height, difficulty.width),
    status: 'ready',
    remainingFlags: difficulty.numMines,
    randSeed,
    numFlagged: 0,
  }
}

/** Make cell revealed at the given coordinate. */
export function revealCell(game: Minesweeper, coordinate: Coordinate): Minesweeper {
  if (game.status === 'ready') {
    // Note: timer starts here and when game status changes from Running it will stop.
    return {
      ...game,
      grid: initiateGrid(game.grid, game.difficulty, coordinate, game.randSeed!),
      status: 'running',
    }
  }
  if (game.status !== 'running') {
    return game
  }

  const cell = game.grid[coordinate.y][coordinate.x]
  if (cell.status === 'revealed') {
    return game
  }

  if (cell.mineCount === -1) {
    return {
      ...game,
      grid: setLoseState(game.grid, coordinate),
      savedGridState: game.grid,
      status: 'loss',
    }
  }

  const grid = revealCellInGrid(game.grid, coordinate)
  if (isWinGrid(grid)) {
    return {
      ...game,
      grid: flagAllMineCells(grid),
      remainingFlags: 0,
      status: 'win',
    }
  }
  return { ...game, grid }
}

/** Toggle the flag value of cell at the given coordinate. */
export function toggleFlag(game: Minesweeper, coordinate: Coordinate): Minesweeper {
  const cell = game.grid[coordinate.y][coordinate.x]
  if (game.status !== 'running' || cell.status === 'revealed') {
    return game
  }
  return {
    ...game,
    grid: toggleFlagInGrid(game.grid, coordinate),
  }
}

/** Load the previous state before the game had been lost. */
export function undoLoosingMove(game: Minesweeper): Minesweeper {
  if (game.status !== 'loss' || !game.savedGridState) {
    console.warn(`incorrect state of GameStatus: ${game.status}, GameStatus must be ${'loss'}`)
    return game
  }
  return {
    ...game,
    grid: game.savedGridState.map((row) => row.map((cell) => cell)),
    status: 'running',
  }
}
