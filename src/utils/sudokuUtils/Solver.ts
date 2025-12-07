import { shuffleArray } from './GridUtuls';
import { isValid } from './Validation';
import { SudokuGridType } from '@/types/sudoku';

export const solveGrid = (grid: SudokuGridType): boolean => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

                for (const num of numbers) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;

                        if (solveGrid(grid)) return true;

                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

export const hasUniqueSolution = (grid: SudokuGridType  ): boolean => {
    let solutions = 0;

    const findNextCell = (grid: SudokuGridType): { row: number; col: number } | null => {
        let minOptions = 10;
        let cell = null;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    let optionsCount = 0;
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(grid, row, col, num)) {
                            optionsCount++;
                        }
                    }
                    if (optionsCount < minOptions) {
                        minOptions = optionsCount;
                        cell = { row, col };
                    }
                }
            }
        }

        return cell;
    }

    const solveWithCounting = (grid: SudokuGridType): boolean => {
        const cell = findNextCell(grid);
        if (!cell) {
            solutions++;
            return solutions <= 1;
        }

        const { row, col } = cell;
        for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (solveWithCounting(grid as SudokuGridType)) {
                    if (solutions > 1) return false;
                }
                grid[row][col] = 0;
            }
        }

        return false;
    }

    solveWithCounting(grid);
    return solutions === 1;
}
