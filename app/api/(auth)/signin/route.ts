import { connectDB } from "@/lib/ConnectDB";
import User from "@/lib/models/login";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  await connectDB();

  const { email, password } = await request.json();

  // 1. Find user by email
  const user = await User.findOne({ email });

  // 2. If user not found
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // 3. Compare password
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  // 4. If success
  return NextResponse.json({
    message: "Login successful",
    user: {
      email: user.email,
      role: user.role,
      id: user._id,
    },
  });
};
