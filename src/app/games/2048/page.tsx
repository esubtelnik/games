import TwentyFortyEightPage from "@/pages/TwentyFortyEightPage";
import { getCurrentUser } from "@/lib/auth-service";
import Progress from "@/models/Progress";
import connectDB from "@/lib/mongoose";
import { IProgress } from "@/types/progress";

export default async function Page() {
  await connectDB();
  const user = await getCurrentUser();
  
  let initialProgress: IProgress | null = null;

  if (user) {
    initialProgress = await Progress.findOne({ userId: user._id }).lean();
  }

  return <TwentyFortyEightPage initialData={initialProgress?.twentyFortyEight || null} />;
}