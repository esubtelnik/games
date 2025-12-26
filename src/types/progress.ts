import { Types } from "mongoose";

export interface ITwentyFortyEight {
   grid: number[][];
   score: number;
   gridSize: number;
}

export interface IProgress {
   userId: Types.ObjectId | string;
   twentyFortyEight: ITwentyFortyEight;
}
