import { IUser } from "@/types/user";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema<IUser>({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  const User = models.User || model<IUser>("User", UserSchema);
  export default User;