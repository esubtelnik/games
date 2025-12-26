import { cookies } from "next/headers";
import { ApiResponse } from "@/lib/api-response";
import { StatusCodes } from "http-status-codes";

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    return ApiResponse.success({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return ApiResponse.error(
      "Failed to logout", 
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}