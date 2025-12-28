import { NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import connectDB from "@/lib/mongoose";
import BestScore from "@/models/BestScore";
import { ApiResponse } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth-service";
import { GameType } from "@/types/entities";
import { IBestScore } from "@/types/bestScore";

export async function GET(req: NextRequest) {
   try {
      await connectDB();

      const user = await getCurrentUser();
      if (!user) {
         return ApiResponse.error("Unauthorized", StatusCodes.UNAUTHORIZED);
      }

      const { searchParams } = new URL(req.url);
      const gameType = searchParams.get("gameType");
      const gameConfig = searchParams.get("gameConfig");

      const query = { userId: user._id };

      if (gameType) {
         (query as IBestScore).gameType = gameType as GameType;
      }

      if (gameConfig) {
         (query as IBestScore).gameConfig = gameConfig;
      }

      const bestScores = await BestScore.find(query).lean();

      return ApiResponse.success(bestScores);
   } catch (error) {
      console.error("Get best scores error:", error);
      return ApiResponse.error(
         "Failed to fetch best scores",
         StatusCodes.INTERNAL_SERVER_ERROR
      );
   }
}

export async function POST(req: NextRequest) {
   try {
      await connectDB();

      const user = await getCurrentUser();
      if (!user) {
         return ApiResponse.error("Unauthorized", StatusCodes.UNAUTHORIZED);
      }

      let body;
      try {
         body = await req.json();
      } catch {
         return ApiResponse.error("Invalid JSON", StatusCodes.BAD_REQUEST);
      }

      const { gameType, gameConfig, score, time } = body;

      if (!gameType || !time) {
         return ApiResponse.error(
            "gameType and time are required",
            StatusCodes.BAD_REQUEST
         );
      }

      if (!Object.values(GameType).includes(gameType)) {
         return ApiResponse.error("Invalid gameType", StatusCodes.BAD_REQUEST);
      }

      const existingBestScore = await BestScore.findOne({
         userId: user._id,
         gameType,
         gameConfig: gameConfig || null,
      });

      let shouldUpdate = false;

      if (!existingBestScore) {
         shouldUpdate = true;
      } else {
         switch (gameType) {
            case GameType.TWENTY48:
               if (score > existingBestScore.score ||
                   (score === existingBestScore.score && time < existingBestScore.time)) {
                  shouldUpdate = true;
               }
               break;

            case GameType.SUDOKU:
            case GameType.FIFTEEN_PUZZLE:
            case GameType.MEMORY_GAME:
            case GameType.MINESWEEPER:
               if (time < existingBestScore.time) {
                  shouldUpdate = true;
               }
               break;
         }
      }

      if (shouldUpdate) {
         const updatedBestScore = await BestScore.findOneAndUpdate(
            {
               userId: user._id,
               gameType,
               gameConfig: gameConfig || null,
            },
            {
               score: score || existingBestScore?.score,
               time,
               achievedAt: new Date(),
            },
            { upsert: true, new: true }
         );

         return ApiResponse.success({
            bestScore: updatedBestScore,
            isNewRecord: true,
         });
      }

      return ApiResponse.success({
         bestScore: existingBestScore,
         isNewRecord: false,
      });
   } catch (error) {
      console.error("Update best score error:", error);
      return ApiResponse.error(
         "Failed to update best score",
         StatusCodes.INTERNAL_SERVER_ERROR
      );
   }
}