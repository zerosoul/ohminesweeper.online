import { RandomNumberGenerator } from "./RandomNumberGenerator";
import {
  CELL_DETONATED,
  CELL_FLAGGED_MAP,
  CELL_HIDDEN_MAP,
  CELL_REVEALED_MAP,
  COORDINATE_DELTAS
} from "./constants";
import { Grid, Coordinate, Cell, Difficulty, MutableGrid, CellStatus } from "./types";

/** Create an initial grid of water cells. */
export function createInitialGrid(height: number, width: number): Grid {
  const cell = CELL_HIDDEN_MAP.get(0)!;
  return Array.from({ length: height }, () => Array.from({ length: width }, () => cell));
}

export function findAdjacentNoFlaggedCoordsByMarkedMineNumber(
  grid: Grid,
  atCoordinate: Coordinate
): Coordinate[] {
  const cell = grid[atCoordinate.y][atCoordinate.x];
  const adjacentCoords = findAdjacentCoords(grid, atCoordinate, true);

  const flaggedCount = adjacentCoords.filter(
    (coord) => grid[coord.y][coord.x].status === "flagged"
  ).length;
  if (flaggedCount >= cell.mineCount) {
    return adjacentCoords.filter((coord) => grid[coord.y][coord.x].status === "hidden");
  } else {
    return [];
  }
}
/** Update cell status to Revealed in grid. If cell has a mine count of 0, the adjacent cells will be made revealed. */
export function revealCellInGrid(grid: Grid, atCoordinate: Coordinate): Grid {
  const newGrid = grid.map((row, y) =>
    row.map((cell, x) =>
      y === atCoordinate.y && x === atCoordinate.x ? CELL_REVEALED_MAP.get(cell.mineCount)! : cell
    )
  );
  const cell = newGrid[atCoordinate.y][atCoordinate.x];
  if (cell.mineCount !== 0) {
    return newGrid;
  }
  const adjacentCells = findAdjacentCells(newGrid, atCoordinate);
  for (let y = 0; y < newGrid.length; y++) {
    const row = newGrid[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell.status !== "revealed" && adjacentCells.has(row.length * y + x)) {
        newGrid[y][x] = CELL_REVEALED_MAP.get(cell.mineCount)!;
      }
    }
  }
  return newGrid;
}

/** Toggle the flag value of cell at the given coordinate. */
export function toggleFlagInGrid(grid: Grid, coordinate: Coordinate): Grid {
  const cell = grid[coordinate.y][coordinate.x];
  if (cell.status !== "hidden" && cell.status !== "flagged") {
    return grid;
  }

  return grid.map((row, y) =>
    row.map((cell, x) =>
      y === coordinate.y && x === coordinate.x
        ? cell.status === "flagged"
          ? CELL_HIDDEN_MAP.get(cell.mineCount)!
          : CELL_FLAGGED_MAP.get(cell.mineCount)!
        : cell
    )
  );
}

/** Convert the grid to a win state. Reveals all cells. */
export function revealAllCells(grid: Grid): Grid {
  return grid.map((row) =>
    row.map((cell) => (cell.status !== "revealed" ? CELL_REVEALED_MAP.get(cell.mineCount)! : cell))
  );
}
/** Convert the grid to a win state. Flag all mine cells. */
export function flagAllMineCells(grid: Grid): Grid {
  return grid.map((row) =>
    row.map((cell) => (cell.status !== "revealed" ? CELL_FLAGGED_MAP.get(cell.mineCount)! : cell))
  );
}

/** Fill the grid with mine and water cells. A seed coordinate is needed as the first cell
 * clicked should be a water cell with a mine count of 0. Returns new minesweeper grid instance.
 */
export function initiateGrid(
  grid: Grid,
  difficulty: Difficulty,
  firstCoordinate: Coordinate,
  randSeed: number
): Grid {
  const newGrid: MutableGrid = grid.map((row) => row.map((cell) => cell));
  layMines(newGrid, firstCoordinate, difficulty.numMines, randSeed);

  const cell = newGrid[firstCoordinate.y][firstCoordinate.x];
  if (cell.mineCount === -1) {
    console.warn("cell should not be a mine cell", cell, firstCoordinate);
  }
  return revealCellInGrid(newGrid, firstCoordinate);
}

/**
 * Convert the grid to a lose state. Saves the current state, detonates the mine, and reveals
 * all cells.
 */
export function setLoseState(grid: Grid, detonationCoordinate: Coordinate): Grid {
  return grid.map((row, y) =>
    row.map((cell, x) =>
      y === detonationCoordinate.y && x === detonationCoordinate.x
        ? CELL_DETONATED
        : cell.mineCount === -1
        ? CELL_REVEALED_MAP.get(cell.mineCount)!
        : cell
    )
  );
}

/** Check if the game has been won. */
export function isWinGrid(grid: Grid): boolean {
  let revealedWaterCells = 0,
    mines = 0,
    totalCells = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const cell = grid[y][x];
      if (cell.status === "revealed" && cell.mineCount !== -1) {
        revealedWaterCells++;
      }
      if (cell.mineCount === -1) {
        mines++;
      }
      totalCells++;
    }
  }
  return revealedWaterCells === totalCells - mines;
}

/** Count amount flagged. */
export function countFlagged(grid: Grid): { numFlagged: number; remainingFlags: number } {
  let flagged = 0,
    mines = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const cell = grid[y][x];
      if (cell.status === "flagged") {
        flagged++;
      }
      if (cell.mineCount === -1) {
        mines++;
      }
    }
  }
  return { numFlagged: flagged, remainingFlags: mines - flagged };
}

/** Generates random mine points, lays mines, and lays mine counts. */
export function layMines(
  grid: MutableGrid,
  seedPoint: Coordinate,
  mineAmt: number,
  randSeed: number
): void {
  const randMin = 0;
  const randMax = 1;
  const randomNumberGenerator = new RandomNumberGenerator(randSeed, randMin, randMax);
  const height = grid.length;
  const width = grid[0].length;
  const isSmallGrid = height < 4 && width < 4;
  const minDistance = isSmallGrid ? 1 : 2;
  const mine = CELL_HIDDEN_MAP.get(-1)!;

  let layedMines = 0;
  while (layedMines !== mineAmt) {
    let minePoint: Coordinate | undefined;
    while (minePoint === undefined) {
      const randPoint = {
        x: Math.floor(randomNumberGenerator.generate() * width),
        y: Math.floor(randomNumberGenerator.generate() * height)
      };
      const distance = findCoordinateDistance(seedPoint, randPoint);
      if (distance < minDistance) {
        continue;
      }
      minePoint = randPoint;
    }

    const canLay = grid[minePoint.y][minePoint.x].mineCount !== -1;
    if (canLay) {
      grid[minePoint.y][minePoint.x] = mine;
      layedMines++;
    }
  }

  layAdjacentMineCounts(grid);
}

function layAdjacentMineCounts(grid: MutableGrid): void {
  const height = grid.length;
  const width = grid[0].length;

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell.mineCount === -1) {
        continue;
      }

      let adjMines = 0;
      for (let i = 0; i < COORDINATE_DELTAS.length; i++) {
        const delta = COORDINATE_DELTAS[i];
        const adjY = y + delta.y;
        const adjX = x + delta.x;
        if (adjY >= height || adjY < 0 || adjX >= width || adjX < 0) {
          continue;
        }
        const adjCell = grid[adjY][adjX];
        if (adjCell?.mineCount === -1) {
          adjMines++;
        }
      }

      if (adjMines > 0) {
        grid[y][x] = CELL_HIDDEN_MAP.get(adjMines)!;
      }
    }
  }
}

/** Find the distance (the amount of steps) between two coordinates. */
function findCoordinateDistance(coordinateA: Coordinate, coordinateB: Coordinate): number {
  const distanceX = Math.abs(coordinateB.x - coordinateA.x);
  const distanceY = Math.abs(coordinateB.y - coordinateA.y);
  const min = Math.min(distanceX, distanceY);
  const max = Math.max(distanceX, distanceY);
  const diagonalSteps = min;
  const straightSteps = max - min;
  return Math.sqrt(2) * diagonalSteps + straightSteps;
}

/** Find adjacent cells of a 0 mine count cell at the given coordinate. */
function findAdjacentCells(grid: Grid, coordinate: Coordinate): ReadonlyMap<number, Cell> {
  const height = grid.length;
  const width = grid[0].length;

  const adjIndexes = new Map<number, Cell>();
  const adjIndexQueue: number[] = [width * coordinate.y + coordinate.x];
  while (adjIndexQueue.length > 0) {
    const currIndex = adjIndexQueue.shift()!;
    const checked = adjIndexes.has(currIndex);
    if (checked) {
      continue;
    }
    const y = Math.floor(currIndex / width);
    const x = currIndex % width;
    const cell = grid[y][x];
    adjIndexes.set(currIndex, cell);

    if (cell.mineCount !== 0) {
      continue;
    }

    for (let i = 0; i < COORDINATE_DELTAS.length; i++) {
      const delta = COORDINATE_DELTAS[i];
      const adjY = y + delta.y;
      const adjX = x + delta.x;
      if (adjY >= height || adjY < 0 || adjX >= width || adjX < 0) {
        continue;
      }
      const adjIndex = width * adjY + adjX;
      adjIndexQueue.push(adjIndex);
    }
  }

  return adjIndexes;
}

/** Find adjacent coords of a 0 mine count cell at the given coordinate. */
export function findAdjacentCoords(
  grid: Grid,
  coordinate: Coordinate,
  includeFlagged?: boolean
): ReadonlyArray<Coordinate> {
  const coords: Coordinate[] = [];
  const includeFlaggedCells = includeFlagged ?? false;
  const filterStatusArr: CellStatus[] = includeFlaggedCells ? ["flagged", "hidden"] : ["hidden"];
  const findNonVisibleAdjacentCoords = (coordinate: Coordinate): void => {
    COORDINATE_DELTAS.forEach(({ x, y }) => {
      const adjacentCoordinate = {
        x: coordinate.x + x,
        y: coordinate.y + y
      };
      if (
        adjacentCoordinate.y < 0 ||
        adjacentCoordinate.x < 0 ||
        adjacentCoordinate.y >= grid.length ||
        adjacentCoordinate.x >= grid[0].length
      ) {
        return;
      }

      const adjacentCell = grid[adjacentCoordinate.y][adjacentCoordinate.x];
      if (
        !filterStatusArr.includes(adjacentCell.status) ||
        coords.some((c) => c.x == adjacentCoordinate.x && c.y == adjacentCoordinate.y)
      ) {
        return;
      }
      coords.push(adjacentCoordinate);
      if (adjacentCell.mineCount === 0) {
        findNonVisibleAdjacentCoords(adjacentCoordinate);
      }
    });
  };

  findNonVisibleAdjacentCoords(coordinate);
  return coords;
}
