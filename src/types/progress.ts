import { Types } from "mongoose";
import { SudokuGridType } from "./sudoku";
import { TwentyFortyEightGridType } from "./twentyFortyEight";
import { FifteenTileType } from "./fifteenPuzzle";
import { Difficulty, GameStatus, MinesweeperGridType } from "./minesweeper";

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

export interface IFifteenPuzzleProgress {
   tiles: FifteenTileType[];
   emptyIndex: number;
   rows: number;
   cols: number;
   gameMode: number;
   gameTimer: IGameTimer;
   lastUpdated?: Date;
}

export interface IMinesweeperProgress {
   grid: MinesweeperGridType;
   difficulty: Difficulty;
   gameTimer: IGameTimer;
   gameStatus: GameStatus;
   isFirstClick: boolean;
   lastUpdated?: Date;
}



export interface IProgress {
   userId: Types.ObjectId | string;
   twentyFortyEight: ITwentyFortyEightProgress;
   sudoku: ISudokuProgress;
   fifteenPuzzle: IFifteenPuzzleProgress;
   minesweeper: IMinesweeperProgress;
}
