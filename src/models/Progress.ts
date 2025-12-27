import { Schema, model, models } from "mongoose";
import { IProgress, ISudokuProgress, IGameTimer, ITwentyFortyEightProgress, IFifteenPuzzle } from "@/types/progress";

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
         default: () => ({ seconds: 0, isPaused: false })
      },
      lastUpdated: {
         type: Date,
         default: Date.now,
      },
   },
   { _id: false }
);


const FifteenPuzzleSchema = new Schema<IFifteenPuzzle>({
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
}, { _id: false });

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
});

const Progress = models.Progress || model("Progress", ProgressSchema);

export default Progress;
