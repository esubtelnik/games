import { model, models, Schema } from "mongoose";
import { IGameStats } from "@/types/gameStats";

const GameStatsSchema = new Schema<IGameStats>({
   userId: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
   },
   totalGamesPlayed: {
      type: Number,
      default: 0,
   },
   gamesByType: {
      twentyFortyEight: {
         type: Number,
         default: 0,
      },
      sudoku: {
         type: Number,
         default: 0,
      },
      fifteenPuzzle: {
         type: Number,
         default: 0,
      },
      memoryGame: {
         type: Number,
         default: 0,
      },
      minesweeper: {
         type: Number,
         default: 0,
      },
   },
   lastPlayed: {
      type: Date,
      default: Date.now,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const GameStats = models.GameStats || model<IGameStats>("GameStats", GameStatsSchema);
export default GameStats;