import { Types } from "mongoose";
import { SudokuGridType } from "./sudoku";
import { TwentyFortyEightGridType } from "./twentyFortyEight";

export interface IGameTimer {
   seconds: number;
   isPaused: boolean;
}

export interface ITwentyFortyEightProgress {
   grid: TwentyFortyEightGridType;
   score: number;
   gridSize: number;
   gameTimer: IGameTimer;
   lastUpdated?: Date;
}

export interface ISudokuProgress {
   grid: SudokuGridType;
   userGrid: SudokuGridType;
   initialEditableCells: boolean[][];
   gameMode: number;
   hintsAmount: number;
   gameTimer: IGameTimer;
   lastUpdated?: Date;
}

// export interface IFifteenPuzzle {
//    // tiles: FifteenTileType[];
// }

export interface IProgress {
   userId: Types.ObjectId | string;
   twentyFortyEight: ITwentyFortyEightProgress;
   sudoku: ISudokuProgress;
   // fifteenPuzzle: IFifteenPuzzle;
}
