import { connectDB } from "@/lib/ConnectDB";
import User from "@/lib/models/login";

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  await connectDB();

  const body = await request.json();

  const { password, email } = body;

  const hashPassword = bcrypt.hashSync(password, 10);

  const user = await User.create({
    email: email,
    password: hashPassword,
    role: "ADMIN",
  });

  return NextResponse.json({ message: "user successfully created", user });
};

export const GET = async (request: Request) => {
  await connectDB();
  const category = await User.find();
  return NextResponse.json({ message: "Success", category });
};

export const DELETE = async (request: Request) => {
  await connectDB();
  const body = await request.json();

  const category = await User.findByIdAndDelete(body._id);

  return NextResponse.json({ message: "Deleted successfully...", category });
};
