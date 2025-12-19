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

      let body;
      try {
         body = await req.json();
      } catch {
         return ApiResponse.error(
            "Invalid JSON format",
            StatusCodes.BAD_REQUEST
         );
      }

      const { name, password } = body;

      if (!name || !password) {
         return ApiResponse.error(
            "All fields are required",
            StatusCodes.BAD_REQUEST
         );
      }

      if (password.length < 6) {
         return ApiResponse.error(
            "Password must be at least 6 characters",
            StatusCodes.BAD_REQUEST
         );
      }

      const existingUser = await User.findOne({ name });
      if (existingUser) {
         return ApiResponse.error("User already exists", StatusCodes.CONFLICT);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
         name,
         password: hashedPassword,
      });

      const token = signToken({
         userId: user._id.toString(),
         name: user.name,
      });

      const response = ApiResponse.success<AuthResponse>(
         {
            //  token: token,
            user: {
               id: user._id.toString(),
               name: user.name,
            },
         },
         StatusCodes.CREATED
      );

      (await cookies()).set("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         path: "/",
         maxAge: 60 * 60 * 24 * 7,
      });
      return response;
   } catch (error: unknown) {
      console.error("Registration error:", error);

      const errorMessage =
         error instanceof Error ? error.message : "Internal Server Error";
      return ApiResponse.error(errorMessage, StatusCodes.INTERNAL_SERVER_ERROR);
   }
}
