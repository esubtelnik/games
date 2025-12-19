import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongoose";
import { signToken } from "@/lib/jwt";
import { StatusCodes } from "http-status-codes";
import User from "@/models/User";
import { ApiResponse } from "@/lib/api-response";
import { AuthResponse } from "@/types/user";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
   try {
      await connectDB();
      const { name, password } = await req.json();

      if (!name || !password) {
         return ApiResponse.error(
            "Name and password are required",
            StatusCodes.BAD_REQUEST
         );
      }

      const user = await User.findOne({ name });
      if (!user) {
         return ApiResponse.error(
            "Invalid credentials",
            StatusCodes.UNAUTHORIZED
         );
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
         return ApiResponse.error(
            "Invalid credentials",
            StatusCodes.UNAUTHORIZED
         );
      }

      const token = signToken({
         userId: user._id.toString(),
         name: user.name,
      });

      const response = ApiResponse.success<AuthResponse>({
         //  token,
         user: {
            id: user._id.toString(),
            name: user.name,
         },
      });

      (await cookies()).set("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         path: "/",
         maxAge: 60 * 60 * 24 * 7,
      });
      return response;
   } catch (error: unknown) {
      console.error("Login error:", error);

      const errorMessage =
         error instanceof Error ? error.message : "Internal Server Error";
      return ApiResponse.error(errorMessage, StatusCodes.INTERNAL_SERVER_ERROR);
   }
}
