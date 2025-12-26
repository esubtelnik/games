// src/utils/minesweeperUtils/gameLogic.ts
import { ICell, MinesweeperGridType } from '@/types/minesweeper';

export const createEmptyGrid = (rows: number, cols: number): MinesweeperGridType => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0
    }))
  );
};

export const placeMines = (
  grid: MinesweeperGridType,
  mineCount: number,
  firstClickRow: number,
  firstClickCol: number
): MinesweeperGridType => {
  const rows = grid.length;
  const cols = grid[0].length;
  let minesPlaced = 0;

  // Создаём безопасную зону вокруг первого клика (3x3)
  const safeZone = new Set<string>();
  for (let r = firstClickRow - 1; r <= firstClickRow + 1; r++) {
    for (let c = firstClickCol - 1; c <= firstClickCol + 1; c++) {
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        safeZone.add(`${r},${c}`);
      }
    }
  }

  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    const key = `${row},${col}`;

    if (!grid[row][col].isMine && !safeZone.has(key)) {
      grid[row][col].isMine = true;
      minesPlaced++;
    }
  }

  return grid;
};

export const calculateNeighborMines = (grid: MinesweeperGridType): MinesweeperGridType => {
  const rows = grid.length;
  const cols = grid[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!grid[row][col].isMine) {
        let count = 0;
        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c].isMine) {
              count++;
            }
          }
        }
        grid[row][col].neighborMines = count;
      }
    }
  }

  return grid;
};

export const revealCell = (
  grid: MinesweeperGridType,
  row: number,
  col: number
): MinesweeperGridType => {
  const rows = grid.length;
  const cols = grid[0].length;

  if (
    row < 0 || row >= rows ||
    col < 0 || col >= cols ||
    grid[row][col].isRevealed ||
    grid[row][col].isFlagged
  ) {
    return grid;
  }

  grid[row][col].isRevealed = true;

  // Если это пустая ячейка (0 соседних мин), открываем соседей рекурсивно
  if (grid[row][col].neighborMines === 0 && !grid[row][col].isMine) {
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r !== row || c !== col) {
          revealCell(grid, r, c);
        }
      }
    }
  }

  return grid;
};

export const toggleFlag = (
  grid: MinesweeperGridType,
  row: number,
  col: number
): MinesweeperGridType => {
  if (!grid[row][col].isRevealed) {
    grid[row][col].isFlagged = !grid[row][col].isFlagged;
  }
  return grid;
};

export const checkWin = (grid: MinesweeperGridType): boolean => {
  return grid.every(row =>
    row.every(cell =>
      (cell.isMine && !cell.isRevealed) || (!cell.isMine && cell.isRevealed)
    )
  );
};

export const revealAllMines = (grid: MinesweeperGridType): MinesweeperGridType => {
  return grid.map(row =>
    row.map(cell => ({
      ...cell,
      isRevealed: cell.isMine ? true : cell.isRevealed
    }))
  );
};

export const countFlags = (grid: MinesweeperGridType): number => {
  return grid.flat().filter(cell => cell.isFlagged).length;
};