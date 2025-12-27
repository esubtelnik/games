import { IUser } from "@/types/user";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema<IUser>({
   name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
   },
   password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   activeSaves: {
      twentyFortyEight: {
         type: Boolean,
         default: false,
      },
      sudoku: {
         type: Boolean,
         default: false,
      },
      fifteenPuzzle: {
         type: Boolean,
         default: false,
      },
      minesweeper: {
         type: Boolean,
         default: false,
      },
   },
});

const User = models.User || model<IUser>("User", UserSchema);
export default User;
