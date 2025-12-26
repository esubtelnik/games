import SudokuPage from "@/pages/SudokuPage";
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

  return <SudokuPage initialData={initialProgress?.sudoku || null} />;
}