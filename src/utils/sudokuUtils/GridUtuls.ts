import { SudokuGridType } from "@/types/sudoku";

export const createEmptyGrid = (): SudokuGridType => {
   return Array.from({ length: 9 }, () => Array(9).fill(0));
};

export const printGrid = (grid: SudokuGridType): void => {
   console.log(grid.map((row) => row.join(" ")).join("\n"));
};

export const shuffleArray = (array: number[]): number[] => {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
};
