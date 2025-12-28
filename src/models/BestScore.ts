import { model, models, Schema } from "mongoose";
import { GameType } from "@/types/entities";
import { IBestScore } from "@/types/bestScore";

const BestScoreSchema = new Schema<IBestScore>({
   userId: {
      type: String,
      ref: "User",
      required: true,
   },
   gameType: {
      type: String,
      enum: Object.values(GameType),
      required: true,
   },
   gameConfig: {
      type: String,
      required: false,
   },
   score: {
      type: Number,
      required: false,
   },
   time: {
      type: Number,
      required: true,
   },
   achievedAt: {
      type: Date,
      default: Date.now,
   },
});

BestScoreSchema.index({ userId: 1, gameType: 1, gameConfig: 1 }, { unique: true });

const BestScore = models.BestScore || model<IBestScore>("BestScore", BestScoreSchema);

export default BestScore;