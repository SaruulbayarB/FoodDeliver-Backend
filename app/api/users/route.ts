import { connectDB } from "@/lib/ConnectDB";
import User from "@/lib/models/login";

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  await connectDB();
  const registeredUserList = await User.find();
  return NextResponse.json({ message: "Success", registeredUserList });
};

export const DELETE = async (request: Request) => {
  await connectDB();
  const body = await request.json();

  const category = await User.findByIdAndDelete(body._id);

  return NextResponse.json({ message: "Deleted successfully...", category });
};
