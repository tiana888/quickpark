import type { UserData } from "@lib/shared_types";
import { randomUUID } from "crypto";
import mongoose from "mongoose";

interface UserDocument extends Omit<UserData, "id">, mongoose.Document {}

interface UserModel extends mongoose.Model<UserDocument> {}

// We enforce the type by adding `<CardDocument>` after `mongoose.Schema`.
const UserSchema = new mongoose.Schema<UserDocument>(
  {
    displayId: {
      type: String,
      required: false,
      default: randomUUID,
    },
    username: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);
export default User;
