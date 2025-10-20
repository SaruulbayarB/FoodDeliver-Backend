import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phoneNumber: { type: Number },
    role: { type: String, required: true, enum: ["ADMIN", "USER"] },
  },

  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
