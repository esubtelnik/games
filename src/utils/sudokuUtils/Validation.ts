import { SudokuGridType } from '@/types/sudoku';

export const isValid = (grid: SudokuGridType, row: number, col: number, num: number): boolean => {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num) return false;
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) return false;
        }
    }

    return true;
}

export const validateGrid = (grid: SudokuGridType): boolean => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = grid[row][col];
            grid[row][col] = 0;
            if (!isValid(grid, row, col, num)) return false;
            grid[row][col] = num;
        }
    }
    return true;
}
