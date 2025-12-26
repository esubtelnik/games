import { Schema, model, models } from "mongoose";
import { IProgress } from "@/types/progress";

const SudokuSchema = new Schema(
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
      lastUpdated: {
         type: Date,
         default: Date.now,
      },
   },
   { _id: false }
);

const TwentyFortyEightSchema = new Schema(
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
});

const Progress = models.Progress || model("Progress", ProgressSchema);

export default Progress;
