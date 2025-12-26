import { Schema, model, models } from "mongoose";
import { IProgress } from "@/types/progress";

const ProgressSchema = new Schema<IProgress>({
   userId: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
   },
   twentyFortyEight: {
      grid: {
         type: [[Number]],
         default: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
         ],
      },
      score: { type: Number, default: 0 },
      gridSize: { type: Number, default: 4 },
   },
});

const Progress = models.Progress || model("Progress", ProgressSchema);

export default Progress;
