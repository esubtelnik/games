import MenuPage from "@/pages/MenuPage";
import { getCurrentUser } from "@/lib/auth-service";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import { IActiveSave } from "@/types/entities";

export default async function Page() {
   let isLoggedIn = false;
   let activeSaves = {};

   try {
      await connectDB();
      const currentUser = await getCurrentUser();

      if (currentUser) {
         isLoggedIn = true;

         const user = await User.findById(currentUser._id).lean();
         activeSaves = user?.activeSaves
      }
   } catch (error) {
      console.error("Error fetching user data:", error);
   }
   

   return <MenuPage isLoggedIn={isLoggedIn} activeSaves={activeSaves as IActiveSave} />;
}
