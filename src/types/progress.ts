import { Types } from "mongoose";
import { SudokuGridType } from "./sudoku";
import { TwentyFortyEightGridType } from "./twentyFortyEight";
import { FifteenTileType } from "./fifteenPuzzle";
import { Difficulty as MinesweeperDifficulty, GameStatus as MinesweeperStatus , MinesweeperGridType } from "./minesweeper";
import { GameMode, MemoryGridType, Difficulty as MemoryGameDifficulty, GameStatus as MemoryGameStatus } from "./memoryGame";

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
   difficulty: MinesweeperDifficulty;
   gameTimer: IGameTimer;
   gameStatus: MinesweeperStatus;
   isFirstClick: boolean;
   lastUpdated?: Date;
}


export interface IMemoryGameProgress {
   grid: MemoryGridType;
   gameMode: GameMode;
   difficulty: MemoryGameDifficulty;
   gameTimer: IGameTimer;
   gameStatus: MemoryGameStatus;
   moves: number;
   matches: number;
   currentPlayer: 1 | 2;
   player1Score: number;
   player2Score: number;
   lastUpdated?: Date;
}



export interface IProgress {
   userId: Types.ObjectId | string;
   twentyFortyEight: ITwentyFortyEightProgress;
   sudoku: ISudokuProgress;
   fifteenPuzzle: IFifteenPuzzleProgress;
   minesweeper: IMinesweeperProgress;
   memoryGame: IMemoryGameProgress;
}
