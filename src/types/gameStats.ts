import { Types } from "mongoose";

export interface IGameStats {
   _id?: Types.ObjectId | string;
   userId: Types.ObjectId | string;
   totalGamesPlayed: number;
   gamesByType: {
      twentyFortyEight: number;
      sudoku: number;
      fifteenPuzzle: number;
      memoryGame: number;
      minesweeper: number;
   };
   lastPlayed: Date;
   createdAt: Date;
}

export interface IStatsResponse {
   userGamesPlayed: number;
   totalGamesPlayed: number;
   totalUsers: number;
}