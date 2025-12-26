import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function getCurrentUser() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = verifyToken(token) as { userId: string; name: string } | null;
    if (!decoded || !decoded.userId) return null;

    const user = await User.findById(decoded.userId)
      .select("-password")
      .lean();

    if (!user) return null;

    return {
      ...user,
      _id: user._id.toString(),
    };
  } catch (error) {
    console.error("GetCurrentUser Error:", error);
    return null;
  }
}