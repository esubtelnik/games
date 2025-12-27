import { NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import connectDB from "@/lib/mongoose";
import Progress from "@/models/Progress";
import { ApiResponse } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth-service";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    
    const user = await getCurrentUser();
    if (!user) {
      return ApiResponse.error("Unauthorized", StatusCodes.UNAUTHORIZED);
    }

    const progress = await Progress.findOne({ userId: user._id });

    if (!progress) {
      return ApiResponse.success(null, StatusCodes.OK);
    }

    return ApiResponse.success(progress);
  } catch (error) {
    console.error("Fetch progress error:", error);
    return ApiResponse.error("Failed to fetch progress", StatusCodes.INTERNAL_SERVER_ERROR);
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

    const { gameData, gameType } = body;

    if (!gameType || typeof gameType !== 'string') {
      return ApiResponse.error("Invalid gameType", StatusCodes.BAD_REQUEST);
    }

    const dataToSave = {
      ...gameData,
      lastUpdated: new Date(), 
    };

    const updatedProgress = await Progress.findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          [gameType]: dataToSave
        },
      },
      { upsert: true, new: true }
    );

    const activeSaves = user.activeSaves;
    activeSaves[gameType] = true;

    await User.findByIdAndUpdate(user._id, {
      activeSaves: activeSaves
    });

    return ApiResponse.success(updatedProgress, StatusCodes.OK);
  } catch (error) {
    console.error("Save progress error:", error);
    return ApiResponse.error("Failed to save progress", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}