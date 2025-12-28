import { NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import connectDB from "@/lib/mongoose";
import GameStats from "@/models/GameStats";
import User from "@/models/User";
import { ApiResponse } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth-service";
import { IStatsResponse } from "@/types/gameStats";

export async function GET(req: NextRequest) {
   try {
      await connectDB();

      const currentUser = await getCurrentUser();

      let userGamesPlayed = 0;
      if (currentUser) {
         const userStats = await GameStats.findOne({ userId: currentUser._id });
         userGamesPlayed = userStats?.totalGamesPlayed || 0;
      }

      const allStats = await GameStats.aggregate([
         {
            $group: {
               _id: null,
               totalGames: { $sum: "$totalGamesPlayed" }
            }
         }
      ]);
      const totalGamesPlayed = allStats[0]?.totalGames || 0;

      const totalUsers = await User.countDocuments();

      const response: IStatsResponse = {
         userGamesPlayed,
         totalGamesPlayed,
         totalUsers,
      };

      return ApiResponse.success(response, StatusCodes.OK);
   } catch (error) {
      console.error("Stats error:", error);
      return ApiResponse.error(
         "Failed to fetch stats",
         StatusCodes.INTERNAL_SERVER_ERROR
      );
   }
}