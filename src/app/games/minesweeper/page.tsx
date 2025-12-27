import MinesweeperPage from "@/pages/MinesweeperPage";
import { getCurrentUser } from "@/lib/auth-service";
import connectDB from "@/lib/mongoose";
import Progress from "@/models/Progress";
import { IProgress } from "@/types/progress";

export default async function Page() {
   await connectDB();
   const user = await getCurrentUser();

   let initialProgress: IProgress | null = null;

   if (user) {
      initialProgress = await Progress.findOne({ userId: user._id }).lean();
   }

   return (
      <MinesweeperPage initialData={initialProgress?.minesweeper || null} />
   );
}
