/** Contains the necessary values for a minesweeper game. */
export type Minesweeper = Readonly<{
  /** The difficulty of the game. */
  difficulty: Difficulty;
  /** The current status of the game. */
  status: GameStatus;
  /** The number of cells on the grid. */
  numCells: number;
  /** The game grid. */
  grid: Grid;
  /** The previously saved grid state. */
  savedGridState?: Grid;
  /** The number of flagged cells. */
  numFlagged: number;
  /** The remaining flags. */
  remainingFlags: number;
  /** The number to seed RandomNumberGenerator */
  randSeed: number;
  /** The amount of time in ms since the game began.  */
  elapsedTime: number;
  /** Function that is called once every second. */
  timerCallback?: TimerCallback;
  /** Stops the timer. The property is set when timer has been started. */
  timerStopper?: TimerStopper;
}>;

/** The status of a cell. */
export type CellStatus = "hidden" | "flagged" | "revealed" | "detonated";

/** A cell of a minesweeper game. */
export type Cell = Readonly<{
  /** The status of the cell. */
  status: CellStatus;
  /** The amount of adjacent mines surrounding the cell. Is `-1` if cell is a mine. */
  mineCount: number;
}>;

/** A coordinate of a grid. */
export type Coordinate = Readonly<{
  x: number;
  y: number;
}>;

/** The minesweeper game's difficulty level. */
export type Difficulty = Readonly<{
  height: number;
  width: number;
  numMines: number;
}>;

/** The current status of the game. */
export type GameStatus = "waiting" | "ready" | "running" | "loss" | "win";

/** A callback for the game timer. */
export type TimerCallback = () => void;

/** Stops a timer. It is the function returned when timer is started. */
export type TimerStopper = () => void;

/** A grid made up of cells. */
export type Grid = ReadonlyArray<ReadonlyArray<Cell>>;

/** A grid made up of cells. */
export type MutableGrid = Array<Array<Cell>>;

/** Generates a random number from a seed number. */
// eslint-disable-next-line no-unused-vars
export type RandomNumberGenerator = (max?: number, min?: number) => number;
