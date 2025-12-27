
import { NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import connectDB from "@/lib/mongoose";
import Progress from "@/models/Progress";
import User from "@/models/User";
import { ApiResponse } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth-service";

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

    const { gameType } = body;

    if (!gameType || typeof gameType !== 'string') {
      return ApiResponse.error("Invalid gameType", StatusCodes.BAD_REQUEST);
    }

    const resetData = {};
    
    if (gameType === 'twentyFortyEight') {
      resetData[gameType] = {
        grid: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        score: 0,
        gridSize: 4,
        gameTimer: {
          seconds: 0,
          isPaused: true,
        },
      };
    }

    if (gameType === "sudoku") {
        const emptyGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
        const editableCells = Array.from({ length: 9 }, () => Array(9).fill(true));
      
        resetData[gameType] = {
          grid: emptyGrid,
          userGrid: emptyGrid,
          initialEditableCells: editableCells,
          gameMode: 20,
          hintsAmount: 7,
          gameTimer: {
            seconds: 0,
            isPaused: true,
          },
        };
      }

    if (gameType === "fifteenPuzzle") {
      resetData[gameType] = {
        tiles: Array(16).fill(null),
        emptyIndex: 15,
        rows: 4,
        cols: 4,
        gameMode: 1,
        gameTimer: {
          seconds: 0,
          isPaused: true,
        },
      };
    }

    await Progress.findOneAndUpdate(
      { userId: user._id },
      { $set: resetData },
      { upsert: true }
    );

    await User.findByIdAndUpdate(user._id, { 
      [`activeSaves.${gameType}`]: false 
    });

    return ApiResponse.success({ message: "Progress deleted successfully" }, StatusCodes.OK);
  } catch (error) {
    console.error("Delete progress error:", error);
    return ApiResponse.error("Failed to delete progress", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}