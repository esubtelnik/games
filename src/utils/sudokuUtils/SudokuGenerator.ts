import { SudokuGridType } from '@/types/sudoku';
import { createEmptyGrid } from './GridUtuls';
import { hasUniqueSolution, solveGrid } from './Solver';
import { validateGrid } from './Validation';



export const generateSolvedSudoku = (): SudokuGridType => {
    const grid: SudokuGridType = createEmptyGrid();
    solveGrid(grid);
    console.log(grid);
    if (validateGrid(grid)) {
        return grid;
    } else {
        return generateSolvedSudoku();
    }
}

export const generatePuzzle = (grid: SudokuGridType, removeCount = 20): SudokuGridType => {
    let attempts = 0;

    const maxRemovals = getMaxRemovals(grid);
    if (removeCount > maxRemovals) {
        removeCount = maxRemovals;
    }

    while (removeCount > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (grid[row][col] !== 0) {
            const backup = grid[row][col];
            grid[row][col] = 0; 

            const isValid = hasUniqueSolution(grid);

            if (isValid) {
                removeCount--;
            } else {
                grid[row][col] = backup; 
            }
        }

        attempts++;
        if (attempts > 1000) {
            console.log(
                'Error'
            );
            break;
        }
    }
    return grid;
}

const getMaxRemovals = (grid: SudokuGridType): number => {
    let filledCells = 0;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] !== 0) filledCells++;
        }
    }
   
    return Math.max(filledCells - 17, 0);
}
