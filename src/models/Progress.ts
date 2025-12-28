import { Schema, model, models } from "mongoose";
import {
   IProgress,
   ISudokuProgress,
   IGameTimer,
   ITwentyFortyEightProgress,
   IFifteenPuzzleProgress,
   IMinesweeperProgress,
   IMemoryGameProgress,
} from "@/types/progress";
import { Difficulty as MinesweeperDifficulty, GameStatus as MinesweeperStatus , ICell } from "@/types/minesweeper";
import { GameMode, ICard, Difficulty as MemoryGameDifficulty, GameStatus as MemoryGameStatus } from "@/types/memoryGame";

const GameTimerSchema = new Schema<IGameTimer>(
   {
      seconds: { type: Number, default: 0 },
      isPaused: { type: Boolean, default: false },
   },
   { _id: false }
);

const SudokuSchema = new Schema<ISudokuProgress>(
   {
      grid: {
         type: [[Number]],
         required: true,
      },
      userGrid: {
         type: [[Number]],
         required: true,
      },
      initialEditableCells: {
         type: [[Boolean]],
         required: true,
      },
      gameMode: {
         type: Number,
         required: true,
      },
      hintsAmount: {
         type: Number,
         required: true,
      },
      gameTimer: {
         type: GameTimerSchema,
         required: true,
         default: () => ({ seconds: 0, isPaused: false }),
      },
      lastUpdated: {
         type: Date,
         default: Date.now,
      },
   },
   { _id: false }
);

const TwentyFortyEightSchema = new Schema<ITwentyFortyEightProgress>(
   {
      grid: {
         type: [[Number]],
         required: true,
      },
      score: {
         type: Number,
         required: true,
      },
      gridSize: {
         type: Number,
         required: true,
      },
      gameTimer: {
         type: GameTimerSchema,
         required: true,
         default: () => ({ seconds: 0, isPaused: false }),
      },
      lastUpdated: {
         type: Date,
         default: Date.now,
      },
   },
   { _id: false }
);

const FifteenPuzzleSchema = new Schema<IFifteenPuzzleProgress>(
   {
      tiles: {
         type: [Number],
         required: true,
      },
      emptyIndex: {
         type: Number,
         required: true,
      },
      rows: {
         type: Number,
         required: true,
      },
      cols: {
         type: Number,
         required: true,
      },
      gameMode: {
         type: Number,
         required: true,
      },
      gameTimer: {
         type: GameTimerSchema,
         required: true,
      },
      lastUpdated: {
         type: Date,
         default: Date.now,
      },
   },
   { _id: false }
);

const CellSchema = new Schema<ICell>(
   {
      isMine: {
         type: Boolean,
         required: true,
      },
      isRevealed: {
         type: Boolean,
         required: true,
      },
      isFlagged: {
         type: Boolean,
         required: true,
      },
      neighborMines: {
         type: Number,
         required: true,
      },
   },
   { _id: false }
);

const MinesweeperSchema = new Schema<IMinesweeperProgress>(
   {
      grid: {
         type: [[CellSchema]],
         required: true,
      },
      difficulty: {
         type: String,
         enum: Object.values(MinesweeperDifficulty),
         required: true,
      },
      gameStatus: {
         type: String,
         enum: Object.values(MinesweeperStatus),
         required: true,
      },
      isFirstClick: {
         type: Boolean,
         required: true,
      },
      gameTimer: {
         type: GameTimerSchema,
         required: true,
      },
      lastUpdated: {
         type: Date,
         default: Date.now,
      },
   },
   { _id: false }
);

const CardSchema = new Schema<ICard>(
   {
      id: {
         type: Number,
         required: true,
      },
      value: {
         type: String,
         required: true,
      },
      isFlipped: {
         type: Boolean,
         required: true,
         default: false,
      },
      isMatched: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   { _id: false }
);
const MemoryGameSchema = new Schema<IMemoryGameProgress>(
   {
      grid: {
         type: [CardSchema],
         required: true,
      },
      gameMode: {
         type: String,
         enum: Object.values(GameMode),
         required: true,
         default: GameMode.SINGLE,
      },
      difficulty: {
         type: String,
         enum: Object.values(MemoryGameDifficulty),
         required: true,
         default: MemoryGameDifficulty.EASY,
      },
      gameTimer: {
         type: GameTimerSchema,
         required: true,
         default: () => ({ seconds: 0, isPaused: false }),
      },
      gameStatus: {
         type: String,
         enum: Object.values(MemoryGameStatus),
         required: true,
         default: MemoryGameStatus.IDLE,
      },
      moves: {
         type: Number,
         required: true,
         default: 0,
      },
      matches: {
         type: Number,
         required: true,
         default: 0,
      },
      currentPlayer: {
         type: Number,
         enum: [1, 2],
         required: true,
         default: 1,
      },
      player1Score: {
         type: Number,
         required: true,
         default: 0,
      },
      player2Score: {
         type: Number,
         required: true,
         default: 0,
      },
      lastUpdated: {
         type: Date,
         default: Date.now,
      },
   },
   { _id: false }
);


const ProgressSchema = new Schema<IProgress>({
   userId: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
   },
   twentyFortyEight: {
      type: TwentyFortyEightSchema,
      default: undefined,
   },
   sudoku: {
      type: SudokuSchema,
      default: undefined,
   },
   fifteenPuzzle: {
      type: FifteenPuzzleSchema,
      default: undefined,
   },

   minesweeper: {
      type: MinesweeperSchema,
      default: undefined,
   },
   memoryGame: {
      type: MemoryGameSchema,
      default: undefined,
   },
});

const Progress = models.Progress || model("Progress", ProgressSchema);

export default Progress;
