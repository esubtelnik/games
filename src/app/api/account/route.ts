import { NextRequest } from "next/server";
import connectDB from "@/lib/mongoose";
import { verifyToken } from "@/lib/jwt";
import { StatusCodes } from "http-status-codes";
import User from "@/models/User";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return ApiResponse.error("No token provided", StatusCodes.UNAUTHORIZED);
    }

    const decoded = verifyToken(token) as { userId: string };
    if (!decoded || !decoded.userId) {
      return ApiResponse.error("Invalid or expired token", StatusCodes.UNAUTHORIZED);
    }

    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return ApiResponse.error("User not found", StatusCodes.NOT_FOUND);
    }

    return ApiResponse.success({
      id: user._id.toString(),
      name: user.name,
      createdAt: user.createdAt
    });

  } catch (error) {
    console.error("Account error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return ApiResponse.error(
      errorMessage,
      StatusCodes.INTERNAL_SERVER_ERROR
    );  
  }
}