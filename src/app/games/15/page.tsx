import { getCurrentUser } from "@/lib/auth-service";
import FifteenPuzzlePage from "@/pages/FifteenPuzzlePage";
import connectDB from "@/lib/mongoose";
import { IProgress } from "@/types/progress";
import Progress from "@/models/Progress";

export default async function FifteenPuzzle() {
   await connectDB();
   const user = await getCurrentUser();

   let initialProgress: IProgress | null = null;

   if (user) {
      initialProgress = await Progress.findOne({ userId: user._id }).lean();
   }

   return <FifteenPuzzlePage initialData={initialProgress?.fifteenPuzzle || null} />;
}
